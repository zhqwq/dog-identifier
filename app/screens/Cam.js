import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { Entypo, AntDesign } from '@expo/vector-icons'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { MyContext } from '../utils/contextManager'
import { saveImgToCache, getImg } from '../utils/fileManager'
import * as FileSystem from 'expo-file-system'

export default function Cam({ navigation }) {
  const [state, dispatch] = useContext(MyContext)
  const [hasCamPermission, setHasCamPermission] = useState(null)
  const [hasImgPickerPermission, setHasImgPcikerPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const camera = useRef(null)

  // take picture and save it to album
  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: state.isImgCprs ? 0 : 1 }
      const data = await camera.current.takePictureAsync(options)
      await MediaLibrary.saveToLibraryAsync(data.uri) // 保存到相册中
      const id = await saveImgToCache(data.uri) // 保存到App安装目录下，返回uuid
      const imgUri = await getImg(id) // 根据id获得图片地址

      let option = {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'image',
        mimeType: 'image/png'
      }
      const res = await FileSystem.uploadAsync('http://123.56.93.179:5000/predict', data.uri, option)

      // 生成报告
      const report = {
        id: id,
        res: res.body,
        imageUri: imgUri
      }

      navigation.navigate('Report', { ...report })
    }
  }

  // pick image from album and pass data to Report screen
  const pickImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: state.isImgCprs ? 0 : 1
    }

    let result = await ImagePicker.launchImageLibraryAsync(options)

    let option = {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'image', // post method, body in form-data and key = image, value = image file
      mimeType: 'image/png' // png format
    }

    const res = await FileSystem.uploadAsync('http://123.56.93.179:5000/predict', result.uri, option)

    if (!result.cancelled) {
      const id = await saveImgToCache(result.uri)
      const imgUri = await getImg(id)
      const report = {
        id: id,
        res: res.body,
        imageUri: imgUri
      }
      navigation.navigate('Report', { ...report })
    }
  }

  // 请求 camera 和 ImagePicker 权限
  useEffect(() => {
    ;(async () => {
      const { status: status1 } = await Camera.requestCameraPermissionsAsync()
      setHasCamPermission(status1 === 'granted')
      const { status: status2 } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasImgPcikerPermission(status2 === 'granted')
    })()
  }, [])

  if (hasCamPermission && hasImgPickerPermission === null) {
    return <View />
  }

  if (hasCamPermission && hasImgPickerPermission === false) {
    return <Text>No access to camera or album</Text>
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={ref => {
          camera.current = ref
        }}
      >
        {/* 关闭按钮 */}
        <View style={styles.buttonStartContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* 反转按钮 */}
        <View style={styles.buttonEndContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
            }}
          >
            <AntDesign name="sync" size={24} color="white" />
          </TouchableOpacity>
          {/* 拍照按钮 */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name="circle" size={36} color="white" />
          </TouchableOpacity>
          {/* 相册选择按钮 */}
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonStartContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row', // main axis = row
    margin: 20
  },
  buttonEndContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row', // main axis = row
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  button: {
    flex: 0.1
  },
  text: {
    fontSize: 18,
    color: 'white'
  }
})

import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { Entypo, AntDesign } from '@expo/vector-icons'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { MyContext } from '../utils/contextManager'
import { saveImgToCache, getImg } from '../utils/fileManager'

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
      await MediaLibrary.saveToLibraryAsync(data.uri)

      const id = await saveImgToCache(data.uri)
      const imgUri = await getImg(id)
      const report = {
        id: id,
        dogName: 'TestDog', // TODO: recognize dog algorithem
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

    if (!result.cancelled) {
      const id = await saveImgToCache(result.uri)
      const imgUri = await getImg(id)
      const report = {
        id: id,
        dogName: 'TestDog', // TODO: recognize dog algorithem
        imageUri: imgUri
      }
      navigation.navigate('Report', { ...report })
    }
  }

  // request camera and ImagePicker permission
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
        {/* close button */}
        <View style={styles.buttonStartContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* flip button */}
        <View style={styles.buttonEndContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
            }}
          >
            <AntDesign name="sync" size={24} color="white" />
          </TouchableOpacity>
          {/* take photo button */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name="circle" size={36} color="white" />
          </TouchableOpacity>
          {/* album image picker button */}
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

import React, { useEffect, useContext } from 'react'
// 组件
import { Text, View, Image } from 'react-native'
// 存储
import AsyncStorage from '@react-native-async-storage/async-storage'
// 样式
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
// 全局变量
import { MyContext } from '../utils/contextManager'

// Report: 使用Camera或者选择照片后的跳转页
export default function Report({ route }) {
  const [state, dispatch] = useContext(MyContext)
  const { isDarkMode } = state
  const { imageUri, res, id } = route.params

  // 将id作为key, 将数据保存在AsyncStorage中
  const storeReport = async () => {
    await AsyncStorage.setItem(id, JSON.stringify(route.params))
  }

  useEffect(() => {
    storeReport()
  }, [])

  let data = JSON.parse(res)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{ height: 300, width: 300 }} source={{ uri: imageUri }}></Image>
      {data.predictions.map((val, index) => {
        return (
          <View key={index}>
            <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>Dog Name {val.label}</Text>
            <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>Probability {(100 * val.prop).toFixed(2) + '%'}</Text>
          </View>
        )
      })}
    </View>
  )
}

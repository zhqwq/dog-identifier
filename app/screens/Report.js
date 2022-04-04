import React, { useEffect, useContext } from 'react'
// Components
import { Text, View, Image, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage'
// styles
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
// Global variables
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
  let labels = data.predictions.map(val => val.label)
  let probs = data.predictions.map(val => (100 * val.prop).toFixed(2))

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{ height: 250, width: 250 }} source={{ uri: imageUri }}></Image>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: probs
            }
          ]
        }}
        width={Dimensions.get('window').width - 16}
        height={250}
        yAxisLabel={'%'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      {data.predictions.map((val, index) => {
        return (
          <View key={index}>
            <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>
              {val.label} {(100 * val.prop).toFixed(2) + '%'}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

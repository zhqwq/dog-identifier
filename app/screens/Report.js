import React, { useEffect, useContext } from 'react'
import { Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
import { MyContext } from '../utils/contextManager'

export default function Report({ route }) {
  const [state, dispatch] = useContext(MyContext)
  const { isDarkMode } = state
  const { imageUri, dogName, id } = route.params

  const storeReport = async () => {
    await AsyncStorage.setItem(id, JSON.stringify(route.params))
  }

  useEffect(() => {
    storeReport()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{ height: 200, width: 200 }} source={{ uri: imageUri }}></Image>
      <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>DogName: {dogName}</Text>
      <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>id: {id}</Text>
    </View>
  )
}

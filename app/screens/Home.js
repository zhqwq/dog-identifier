import React, { useContext, useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, Image, Button, RefreshControl } from 'react-native'
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
import styles from '../styles'
import { MyContext } from '../utils/contextManager'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ route, Navigation }) {
  const [state] = useContext(MyContext)
  const [listData, setListData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { isDarkMode } = state

  // 下拉刷新时, 重新获取数据并刷新页面
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await getData()
      setRefreshing(false)
    } catch (error) {
      console.error(error)
    }
  }, [refreshing])

  // 获取listData, item
  const getData = async () => {
    try {
      let keys = []
      keys = await AsyncStorage.getAllKeys()
      let data = await Promise.all(
        keys.map(async key => {
          let item = await AsyncStorage.getItem(key)
          item = JSON.parse(item)
          return item
        })
      )
      setListData(data)
    } catch (error) {
      console.log(error)
    }
  }

  // 删除所有数据
  const deleteAllData = async () => {
    let keys = []
    keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
    await getData()
  }

  useEffect(() => {
    getData()
  }, [])

  const Item = ({ dogName, imageUri, probability }) => (
    <View style={[styles.listItem, isDarkMode ? darkStyles.darkListItem : lightStyles.lightListItem]}>
      <Image style={{ width: 70, height: 70, borderRadius: 50 }} source={{ uri: imageUri }} />
      <Text style={[isDarkMode ? darkStyles.darkText : lightStyles.lightText, { marginLeft: 20 }]}>{dogName}</Text>
    </View>
  )

  // item: id, res, imagUri // 选取概率最高的预测结果作为狗狗名字
  const renderItem = ({ item }) => <Item dogName={JSON.parse(item.res).predictions[0].label} imageUri={item.imageUri} />

  return (
    <View style={[styles.container, isDarkMode ? darkStyles.darkContainer : lightStyles.lightContainer]}>
      <FlatList data={listData} renderItem={renderItem} keyExtractor={item => item.id} style={{ width: '90%' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      <Button onPress={deleteAllData} title="Delete All" color="#841584" />
    </View>
  )
}

import React, { useContext } from 'react'
import { MyContext } from '../utils/contextManager'
import { View, Switch, Text } from 'react-native'
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
import styles from '../styles'

const SettingCell = props => {
  const [state, dispatch] = useContext(MyContext)
  const { isDarkMode, isImgCprs } = state

  return (
    <View style={[styles.cell, isDarkMode ? darkStyles.darkCell : lightStyles.lightCell]}>
      <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>{props.text}</Text>
      <Switch trackColor={{ false: '#3e3e3e', true: '#81b0ff' }} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={props.onValueChange} value={props.value} />
    </View>
  )
}

export default SettingCell

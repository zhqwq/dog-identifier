import React, { useContext } from 'react'
import { View, Switch, Text } from 'react-native'
import SettingCell from '../components/SettingCell'
import darkStyles from '../styles/darkStyles'
import lightStyles from '../styles/lightStyles'
import styles from '../styles'
import { MyContext } from '../utils/contextManager'

export default function Settings() {
  const [state, dispatch] = useContext(MyContext)
  const { isDarkMode, isImgCprs } = state

  const toggleImgCprsSwitch = () => {
    dispatch({ type: 'switchImgCprs' })
  }

  const toggleDarkModeSwitch = () => {
    dispatch({ type: 'switchDarkMode' })
  }

  return (
    <View style={[styles.container, isDarkMode ? darkStyles.darkContainer : lightStyles.lightContainer]}>
      <SettingCell text={'Image Compression'} onValueChange={toggleImgCprsSwitch} value={isImgCprs} />
      <SettingCell text={'Dark Mode'} onValueChange={toggleDarkModeSwitch} value={isDarkMode} />
    </View>
  )
}

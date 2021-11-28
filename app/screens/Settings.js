import React, { useContext } from 'react'
import { View, Switch, Text } from 'react-native'
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
      <View style={[styles.cell, isDarkMode ? darkStyles.darkCell : lightStyles.lightCell]}>
        <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>Image compression</Text>
        <Switch trackColor={{ false: '#3e3e3e', true: '#81b0ff' }} thumbColor={isImgCprs ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleImgCprsSwitch} value={isImgCprs} />
      </View>
      <View style={[styles.cell, isDarkMode ? darkStyles.darkCell : lightStyles.lightCell]}>
        <Text style={isDarkMode ? darkStyles.darkText : lightStyles.lightText}>Dark Mode</Text>
        <Switch trackColor={{ false: '#3e3e3e', true: '#81b0ff' }} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleDarkModeSwitch} value={isDarkMode} />
      </View>
    </View>
  )
}

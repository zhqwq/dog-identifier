import React, { useReducer } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Cam from './app/screens/Cam.js'
import Settings from './app/screens/Settings.js'
import Home from './app/screens/Home.js'
import Report from './app/screens/Report.js'
import { MyContext } from './app/utils/contextManager.js'
import settings from './app/configs/settings.json'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// 定义 context 的 reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'switchDarkMode':
      return Object.assign({}, state, { isDarkMode: !state.isDarkMode })
    case 'switchImgCprs':
      return Object.assign({}, state, { isImgCprs: !state.isImgCprs })
    default:
      return state
  }
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Root component screen for Stack Navigator
function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline'
          } else if (route.name === 'Cam') {
            iconName = focused ? 'ios-camera' : 'ios-camera-outline'
          } else if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cam" component={Cam} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, settings) // useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[state, dispatch]}>
      <NavigationContainer theme={state.isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {/* options={{ headerShown: false }} */}
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  )
}

export default App

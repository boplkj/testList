import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PUsersList from './src/pages/PUsersList'
import PUserScreen from './src/pages/PUserScreen'
import { store } from './src/services/store'

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Items" component={PUsersList} />
          <Stack.Screen name="PUserScreen" component={PUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  )
}

import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from '@/component/AppContext';
import Accueil from '@/screens/Accueil'
import  BottomTab  from "@/screens/bottomTabs";
import Parametre from "@/screens/Parametre"
import Langue from "@/component/Langue"

const Stack= createStackNavigator();

const _layout = () => {
  return (
    <AppProvider>
    
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} options={{headerShown: false}}/>
        <Stack.Screen name="BottomTabs" component={BottomTab} options={{headerShown: false}}/>
              {/* temporaire fa atao any @bottom tabs ity page Langue ity */}
        <Stack.Screen name="Parametre" component={Parametre}/>
        {/* <Stack.Screen name="Langue" component={Langue} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </AppProvider>
  )
}

export default _layout
const styles = StyleSheet.create
({
  container : {
    flex:1
  }
})

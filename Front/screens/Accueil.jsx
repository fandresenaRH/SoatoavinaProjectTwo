import { View, Text, TouchableOpacity,StyleSheet, Image} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function Accueil ({navigation}){
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEE6E6', '#FDE6D0', '#FCE6A7']}
        style={styles.gradient}
      >
        <TouchableOpacity onPress={()=>navigation.navigate('BottomTabs')}>
            <Image source={require('@/assets/images/Soatoavina.jpg')} style={styles.logo}/>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
  gradient:{
    height:800,
    width:390,
  },
  logo:{
    width:100,
    height:100,
    borderRadius:50,
    marginLeft:'38%',
    marginTop:'68%'
  }
})
// import { View, Text } from "react-native";

// export default function Accueil () {
//   return (
//     <View className="flex-1 items-center justify-center bg-red-500">
//       <Text className="text-white text-3xl font-bold">Test NativeWind 🔥</Text>
//     </View>
//   );
// }

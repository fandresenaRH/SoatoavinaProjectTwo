import { View, Text,Image, StyleSheet, Button, TouchableOpacity} from 'react-native'
import React, { useContext }  from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'; 
import { ThemeContext, LanguageContext } from "../component/AppContext";

export default function Fianarana({navigation}){

     // mode nuit et jour
  const { isDarkMode } = useContext(ThemeContext);
  // malagasy/anglais
  const { language } = useContext(LanguageContext);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
      });
    
      if (!fontsLoaded) return null;

      const styles = StyleSheet.create({
        image:{
            height:260,
            width:200,
            marginLeft:100,
            marginTop:40
        },
        container:{
             alignItems:"center",
             backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        },
        containerHaut:{
            height:400,
        },
        containerBas:{
            height:350,
            width:395,
            borderRadius:50,
            alignItems:"center",
            textAlign:"center",
            // backgroundColor:'#FFF7F7',
            backgroundColor: isDarkMode ? "#3A3A4E" : "#FFF7F7",
            paddingTop:50,
            paddingLeft:40,
            paddingRight:40,
            marginTop:50
        },
        titre:{
            fontSize:20,
            fontFamily:'Poppins_700Bold',
            color: isDarkMode ? "#ffffff" : "#000000",
        },
        description:{
            marginTop:10,
            fontFamily:"Poppins_400Regular",
            color: isDarkMode ? "#ffffff" : "#000000",
        },
        bouton:{
            backgroundColor:"#FF9CB5",
            width:190,
            height:40,
            borderRadius:10,
            marginTop:20,
            borderColor:"grey",
            elevation:4
        },
        Textbouton:{
            textAlign:"center",
            marginTop:8,
            fontSize:16,
            fontFamily:"Poppins_400Regular"
        },
        gradient:{
            height:490,
            width:390,
        }
    })

  return (
    <View style={styles.container}>
        <View style={styles.containerHaut}>
            <LinearGradient
                colors={
                    isDarkMode
                    //   ? ["#0f0f0f", "#1a1a1a", "#262626"] // 🌑 Gradient mode nuit #1A1A2E
                    ? ["black", "#2A1A3E"] 
                      : ['#FEE6E6', '#FDE6D0', '#FCE6A7']            // ☀️ Gradient mode jour
                  }
                style={styles.gradient}
            >
            <Image style={styles.image } source={require('./../assets/images/chatbot2-removebg-preview.png')}/>
            </LinearGradient>
            
        </View>
        <View style={styles.containerBas}>
            <Text style={styles.titre}>Ndao hiresaka !</Text>
            <Text style={styles.description}>Anontanio ahy izay tinao ho fantatra momban'ny soatoavina malagasy sy ny anagano malagasy.</Text>
            <TouchableOpacity style={styles.bouton} onPress={()=>navigation.navigate('Chat')}>
                <Text style={styles.Textbouton}>Hiresaka</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}


import { View, Text,StyleSheet,ScrollView,Pressable} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState,useRef,useContext } from 'react';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// mode nuit/jour malagasy/anglais
import { ThemeContext, LanguageContext } from "../../../component/AppContext";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'; 

export default function Fihavanana1(){

  // mode nuit et jour
  const { isDarkMode } = useContext(ThemeContext);
  // malagasy/anglais
  const { language } = useContext(LanguageContext);

  const heartRef = useRef(null)
  const [liked,setLiked]= useState(false)
  const route = useRoute()

  const handleLike = () =>{
    if (liked){
      heartRef?.current?.reset()
    }else{
      heartRef?.current?.play(30,144)
    }

    setLiked(!liked)
  }

  const { proverbe } = route.params || {}; 

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'#FFCA6F'
    },
    titre:{
      textAlign:"center",
      marginTop:10,
      fontFamily:'Poppins_700Bold'
    },
    ohabolana:{
      width:300,
      height:120,
      backgroundColor:"#FDE6D0",
      marginLeft:'12%',
      borderRadius:20,
      marginTop:10
    },
    lottie1:{
      height:60,
      aspectRatio: 1,
   },
   lottie: {
      flex: 1,
      marginBottom: 10,
   },
    quote_left:{
      marginTop: 10,
      marginRight:200
    },
    quote_right:{
      marginLeft:'88%'
    },
    quote_coeur:{
      flexDirection:"row",
      height:40,
      marginLeft:30
    },
    description : {
      alignItems : "center",
      textAlign : "center",
      justifyContent:"center",
      margin : 5,
      fontSize : 15,
      fontFamily:"Poppins_400Regular"
    },
    corps:{
      marginTop:30,
      backgroundColor:"white",
      backgroundColor:'#FFF7F7',
      height : 800,
      borderRadius: 40,
      paddingRight : 20,
    },
    titrefanazavana:{
      marginLeft:'12%',
      marginTop:20,
      fontSize:15,
      fontFamily:'Poppins_700Bold'
    },
    fanazavana:{
      marginLeft:'12%',
      marginTop:20,
      fontSize:13,
      fontFamily:"Poppins_400Regular"
    },
    petitTitre:{
      marginTop:10
    },
    scroll :{
      overflow : "hidden"
    }
  })
  
  return (
    <View style={styles.container}>
        <LinearGradient
          colors={['#FFF7F0', '#FDE6D0', '#FFCA6F']}
          style={styles.gradient}
        >
          <Text style={styles.titre}>Ohabolana</Text>
          <View style={styles.ohabolana}>
            <View style={styles.quote_coeur}>
              <FontAwesome name="quote-left" size={12} style={styles.quote_left}/>
              <Pressable style={styles.lottie1} onPress={handleLike}>
                <LottieView ref={heartRef} style={styles.lottie} source={require('./../../../assets/images/Like.json')} autoPlay loop={false} />
              </Pressable>
            </View>
            <Text style={styles.description}>{proverbe.contenu}</Text>
            <FontAwesome name="quote-right" size={12} style={styles.quote_right}/>
          </View>
        </LinearGradient>

      <View style={styles.corps}>
        <Text style={styles.titrefanazavana}>Fanazavana</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.fanazavana}>1. Fanalavirana ny Harem-be sy ny Tombontsoa Ara-bola</Text>
          <Text style={styles.fanazavana}>{proverbe.explication}</Text>

          <Text style={styles.fanazavana}>2. Fanomezan-danja ny Fifandraisana sy ny Fihavanana</Text>
          <Text style={styles.fanazavana}>Ny tapany hoe "toy izay very tsikalakalam-pihavanana" no tena ivon'ny hafatra. Ny "fihavanana" eto dia manondro ny fifandraisana tsara, ny firaisankina, ny fifanajana, ny fiaraha-monina mirindra, ary indrindra indrindra, ny fatoram-pianakaviana sy ny namana. Ny "tsikalakalam-pihavanana" kely aza, izany hoe ny fifandraisana na firaisankina na fifankatiavana na fifanampiana na fifampizarana na dia kely aza, dia tena sarobidy ary tsy mora soloina.</Text>

          <Text style={styles.fanazavana}>3. Fanjohian-kevitra eo amin'ny fiainana:</Text> 
          <Text style={styles.fanazavana}>Mampianatra antsika ity ohabolana ity fa rehefa misy disadisa na fifanolanana eo amin'ny olona roa na maro, izay mety hipoitra avy amin'ny zavatra ara-bola ohatra: trosa, lova, varotra, dia tsara kokoa ny mandefitra kely amin'ny lafiny ara-bola mba hitazomana ny fifandraisana tsara. Ohatra, aleo mamela trosa kely ho very, na mandefitra amin'ny vidiny, toy izay manapaka ny fifandraisana amin'ny havana na namana noho izany.</Text>

          <Text style={styles.fanazavana}>4. Fampitandremana:</Text>
          <Text style={styles.fanazavana}> Fampitandremana ihany koa izany mba tsy ho entin'ny fitiavan-karena loatra ka ho vonona hanapaka fifandraisana sarobidy noho ny tombontsoa ara-bola. Imbetsaka no mitranga izany eo amin'ny fiainana, ka tapaka ny fifandraisan'ny fianakaviana na ny mpinamana noho ny ady tany, na lova, na vola.</Text>

          <Text style={styles.fanazavana}>5. Fahendrena Malagasy:</Text>
          <Text style={styles.fanazavana}> Anisan'ny fahendrena malagasy lalina izay manome lanja manokana ny "fihavanana". Ny fihavanana no fototry ny fiaraha-monina malagasy, ary mahatonga ny olona hifamelona, hifanampy, ary hiara-miatrika ny olana. Raha simba ny fihavanana, dia simba ny fiaraha-monina iray manontolo.</Text>
        </ScrollView>
      </View>
    </View>
  )
}

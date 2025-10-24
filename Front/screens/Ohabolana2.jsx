import { View, Text,StyleSheet,TextInput,Pressable,FlatList} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState,useRef,useContext,useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'; 
import  { ThemeContext, LanguageContext } from "../component/AppContext";
import {API} from '../api/api';

// const data =[
//   {id :"1", description : "Aleo very tsikalakalam-bola toy izay very tsikalakalam-pihavanana.",pageName:"Fihavanana1",nomUser:"Mirana Andriniaina",commentaire:"Tsy dia mihatra intsony eo amin'ny fiaraha-monina malagasy ity ohabolana ity"},
//   {id :"2", description: "Izay mahavangivangy tian-kavana; ny malemy fanahy tratra amp-parany.", pageName:"Fihavanana2",nomUser:"Fitia Rakoto",commentaire:"Tsy dia mihatra intsony eo amin'ny fiaraha-monina malagasy ity ohabolana ity"},
//   {id :"3", description: "Fitia mifamaly mahatsara fihavanana.", pageName:"Fihavanana3",nomUser:"Lova Andriniaina",commentaire:"Tsy dia mihatra intsony eo amin'ny fiaraha-monina malagasy ity ohabolana ity"},
//   {id :"4", description: "Ny ahiahy tsy ihavanana .", pageName:"Fihavanana4",nomUser:"Nirina Rabe",commentaire:"Tsy dia mihatra intsony eo amin'ny fiaraha-monina malagasy ity ohabolana ity"}
// ]

export default function Ohabolana({navigation}){
  const[data, setData] = useState([]);
  const [search,setSearch]= useState('');
  const heartRef = useRef(null)
  const [liked,setLiked]= useState(false)

  const handleLike = () =>{
    if (liked){
      heartRef?.current?.reset()
    }else{
      heartRef?.current?.play(30,144)
    }

    setLiked(!liked)
  }

  useEffect(() => {
    API.get(`/proverbes/courts`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Erreur lors du fetch des proverbes:", err);
      });
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;

  // mode nuit et jour
  const { isDarkMode } = useContext(ThemeContext);
  // malagasy/anglais
  const { language } = useContext(LanguageContext);

    const renderItem = ({ item }) => (
            <View key={item.idProverbe} style={styles.chaqueElts}>
              <Pressable
                  
                  onPress={()=>navigation.navigate('Fihavanana1', { proverbe: item })}
                  style = {({pressed})=>[
                    styles.bouton,{ backgroundColor : pressed?"#FFF7F7":"#FFF7F7"}
                  ]}
              >
                  <View style={styles.quote_coeur}>
                    <FontAwesome name="quote-left" size={16} style={styles.quote_left}/>
                    <Pressable style={styles.lottie1} onPress={handleLike}>
                      <LottieView ref={heartRef} style={styles.lottie} source={require('./../assets/images/Like.json')} autoPlay loop={false} />
                    </Pressable>
                  </View>
                  <Text style={styles.description}>{item.contenu}</Text>
                  <FontAwesome name="quote-right" size={16} style={styles.quote_right}/>
              </Pressable>
            </View>
    );

    const styles = StyleSheet.create({
      container:{
      // backgroundColor:"#FFF7F7",
      backgroundColor: isDarkMode ? " #1A1A2E" : "#FFF7F7",
      },
      titre:{
        textAlign:"center",
        marginTop:20,
        fontSize:15,
        fontWeight:"500",
        fontFamily:'Poppins_700Bold'
      },
      input:{
        backgroundColor:"#fff",
        width:250,
        borderRadius:20,
        marginLeft:70,  
        borderWidth:3,
        borderColor:"#FFCA6F" ,
      },
      iconeRecherche:{
        marginLeft:10,
        marginTop:10
      },
      bareRecherche:{
        flexDirection:"row",
        paddingBottom:10
      },
      chaqueElts:{
        backgroundColor:"#FFF7F7",
        borderRadius:10,
        borderColor:"#FFCA6F" ,
        marginLeft : 20,
        marginTop : 30,
        height : 160,
        width :350,
        borderColor:"grey",
        elevation:4
      },
      bouton:{
        alignItems:"center",
        height : 150,
        borderRadius:10,
        marginBottom:30
      },
      description:{
        fontSize:18,
        textAlign:"center",
        fontFamily:"Poppins_400Regular",
        width:260,
        marginRight:20
      },
      quote_coeur:{
        flexDirection:"row",
        height:40,
        marginLeft:10
      },
      lottie1:{
        height:60,
        aspectRatio: 1,
     },
     lottie: {
        flex: 1,
        marginBottom: 10,
        // marginLeft:20
     },
      quote_left:{
        marginRight:250,
        marginTop:20,
      },
      quote_right:{
        marginLeft:280,
      }
    })
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titre}>Hitady ohabolana</Text>
        <View style={styles.ohabolana}>
            <Text style={styles.titre}></Text>
            <View style={styles.bareRecherche}>
                <TextInput
                    style={styles.input}
                    placeholder='   Fihavanana'
                    onChangeText={setSearch}
                    value={search}
                />
                <Icon name ="search" size={16} style={styles.iconeRecherche}/>
            </View>
        </View>
      </View>

         <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />

    </View>
  )
}

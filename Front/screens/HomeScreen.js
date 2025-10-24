import React, { useEffect, useState } from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_900Black } from '@expo-google-fonts/poppins'; //Police  Poppins
//useFonts: booléen miretourne fontsLoaded indiquant si les fonts sont prêtes4
import {API, BASE_URL} from '../api/api';
// import axios from "axios";


export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({  
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_900Black,
    
  });       
  const [categories, setCategories] = useState([]);
  const [proverbe, setProverbe] = useState([]);
  const [contes, setContes] = useState([]);

  // const BASE_URL = API.baseURL;

    useEffect(() => {
      const fetchCategories = async()=>{
        try{
          const response = await API.get("/contes/categorie");
          setCategories(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des catégories: ", error);
        }
      }
      fetchCategories();
    }, []);

    useEffect(() => {
      const fetchProverbe = async()=>{
        try{
          const response = await API.get("/proverbes/journalier");
          setProverbe(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement du proverbe: ", error);
        }
      }
      fetchProverbe();
    }, []);

    useEffect(() => {
      const fetchContes = async()=>{
        try{
          const response = await API.get("/contes/favories");
          setContes(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des contes favories: ", error);
        }
      }
      fetchContes();
    }, []);


  if (!fontsLoaded) {  
    return null; 
  }

  const imagesCategories = {
    "Mampalahelo": require('@/assets/images/mampalahelo.png'),
    "Mananatra": require('@/assets/images/mananatra.png'),
    "Mampatahotra": require('@/assets/images/mampitahotra.png'),
    "Mampihomehy": require('@/assets/images/mampihomehy.png'),
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerBox}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText1}>Ohabolana anio</Text>
          <Text style={styles.headerText}>"{proverbe.contenu}"</Text>
        </View>
        <Image source={require('@/assets/images/gasy.png')} style={styles.headerImage} />
      </View>


      
      <Text style={styles.tongasoa}>Ho anao</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {categories.map((category, index) => {
        // 🔥 Associe une image selon le nom reçu du backend
        const imageSource = imagesCategories[category.nom];

        return (
          <TouchableOpacity
            key={index}
            style={styles.categoryCard}
            onPress={() => navigation.navigate("TantaraList", { 
              idCategorie: category.idCategorie, 
              category: category.nom 
            })}
          >
            <View style={styles.imageWrapper}>
              <Image source={imageSource} style={styles.categoryImage} />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageOverlayText}>{category.nom || "Catégorie"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
     
      <Text style={styles.tongasoa}>Angano malaza</Text> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.conteContainer}> 
        {contes.map((conte, index) => (  //tableau conte map
          <TouchableOpacity  //cliquable chaque card misediriger vers TantaraDetails
            key={index}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('TantaraDetails', { story: conte })}
          >
            <View style={styles.conteCard}>
              <View style={styles.storyTextContainer}>
                <Text style={styles.conteTitle}>{conte.titre}</Text>
                <Text style={styles.conteText}>{conte.extrait}</Text>
              </View>
              {/* <Image source={conte.image} style={styles.conteImage} /> */}
              {conte.illustration && (
                    <Image
                      source={{ uri: `${BASE_URL}/static/${conte.illustration.trim()}` }}
                      style= {styles.conteImage}
                    />
                  )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7F0',
  },
  // card ohabolana anio
  headerBox: {
    borderRadius: 15,
    backgroundColor: '#FFA6A8',
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    height: 125,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',  
    alignItems: 'center',
    position: 'relative',
  },
  //Texte Ohabolana anio
  headerText1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    color: '#4A4A4A',
  },
  //Texte ohabolana
  headerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginTop: 5,
    maxWidth: '85%',
    color: '#4A4A4A',
  },
  //image
  headerImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 90,
    height: 100,
    resizeMode: 'contain',
  },
  //Texte Ho anao, Tantara malaza
  tongasoa: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    paddingVertical: 15,
    color: '#4A4A4A',
  },
  //Card Ho anao ,Tantara malaza
  categoryCard: {
    marginRight: 12,
  },
  //Image container Ho anao 
  imageWrapper: {
    width: 180,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  //Image Ho anao
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  //Partie Mampalahelo dans la card
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F4BE83',
    paddingVertical: 10,
    paddingLeft: 8,
  },
  //Texte Mampalahelo( nom catégorie)
  imageOverlayText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#4A4A4A',
  },
  //Angano malaza
  conteContainer: {
    marginTop: 5,
  },
  // card Angano malaza
  conteCard: {
    flexDirection: 'row',
    backgroundColor: '#FCE6A7',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    width: 290,
    height: 125,
  },
  //Texte Angano malaza
  storyTextContainer: {
    flexShrink: 1, 
    paddingLeft: 10,
    color: '#4A4A4A', 
  },
  //Titre angano
  conteTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    color: '#4A4A4A',
  },
  // texte 
  conteText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#4A4A4A',
  },
 // Image Angano malaza
  conteImage: {
    width: 120,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 10,
    resizeMode: 'cover',
  },
});

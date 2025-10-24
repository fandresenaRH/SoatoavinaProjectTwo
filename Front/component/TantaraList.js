import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,StyleSheet,Image,TouchableOpacity,} from 'react-native';  
import { useNavigation, useRoute } from '@react-navigation/native'; //Navigation impérative : navigation.navigate(), useRoute: donne accès à route.params
import {useFonts,Poppins_700Bold,Poppins_400Regular,} from '@expo-google-fonts/poppins';  //chargement police 
import { API, BASE_URL} from '../api/api';


//Tableau ana angano eo am page liste
// const stories = [
//   {
//     id: '1',
//     title: 'Ikotofetsy sy Imahaka',
//     category: 'Mampalahelo',
//     excerpt: 'Indray andro hono, tao amin’ny tanàna lehibe anankiray, nisy mpanjaka be harena.',
//     image: require('@/assets/images/conteikotofetsy.png'),
//     content: `Indray andro hono, tao amin’ny tanàna lehibe anankiray, nisy mpanjaka be harena. 
// Nanana ombilahy maro izy, be no sady voky, fa tsy tia mizara. Tao amin’ny tanàna 
// koa nisy vehivavy antitra narary mafy, tsy nisy afaka hanome zava-manampy azy. 
// Nandeha nangataka omby tamin’ny mpanjaka ireo mpiara-monina. Hoy izy ireo : 
// — Ry mpanjaka ô, mba omeo omby iray ho an’ny renivola antitra marary. 
// Fa hoy ny mpanjaka, mafy fo : 
// — Tsy hanome aho ! Momba ahy ny harena, tsy an'ny olona hafa. 
// Nandre izany i Ikotofetsy sy Imahakà. Hoy Ikotofetsy : 
// — Hataontsika miteny ny omby e. 
// Gaga i Imahakà, fa dia nanaiky. 
// Nanao fika izy ireo : Imahakà no nitsatoka tao anaty sakam-boaloboka tsy lavitra ny 
// omby, dia nitondra feon’olombelona. 
// Naka mpiandry omby i Ikotofetsy, dia niteny : 
// — Ry omby ô, inona no mahazo anao ? 
// Dia niteny i Imahakà tao anaty bozaka (tohiny feo) : 
// — Tadiaviko ny homena ilay renivola antitra, aleo ho faty aho fa hanavotra azy. 
// Gaga be ireo mpiandry. Nentiny tamin’ny mpanjaka izany vaovao izany. Tonga 
// Ikotofetsy, niteny mafy : 
// — Ry mpanjaka, miteny ny omby, milaza fa te ho faty hanavotra ilay antitra. Ny 
// ombinao aza manam-pihetseham-po noho ianao. 
// Menatra ilay mpanjaka. Kivy. Ka niteny : 
// — Aleo ento ilay omby fa tsy tiako hanjary henatra. 
// Nentin’i Ikotofetsy sy Imahakà ilay omby. Natao sakafo, navelany ho an’ilay antitra ny 
// tapany tsara indrindra, fa ny ambiny dia nentiny nifaliany tamin’ny alina 
// Anganon’ny Ntaolo`,
//   },

//   {
//     id: '5',
//     title: 'Ikotofetsy sy Imahaka',
//     category: 'Mampihomehy',
//     excerpt: 'Indray andro hono, tao amin’ny tanàna lehibe anankiray, nisy mpanjaka be harena.',
//     image: require('@/assets/images/image3.jpg'),
//     content: 'Indray andro hono, tao amin’ny tanàna lehibe anankiray, nisy mpanjaka be harena.',
//   },
// ];


//Liste des histoires filtrées par catégorie
const TantaraListScreen = () => {
  const navigation = useNavigation();  //navigation pour changer d'écran
  const route = useRoute();  //accès am paramètre passé à cet écran
  const { idCategorie = null, category = '' } = route.params || {}; //alaina le catégorie passée en paramètre, rh tsisy de chaîne vide
  // const { category = '' } = route.params || {}; //alaina le catégorie passée en paramètre, rh tsisy de chaîne vide

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true)
  //filtrena le tableau stories selon anle catégorie concerné
  useEffect(() => {
    if (idCategorie !== null) {
      API.get(`/contes/categorie/${idCategorie}`)
        .then(response => {
          // console.log("Réponse API:", response.data);
          setStories(response.data);
        })
        .catch(error => console.error("Erreur Axios:", error))
        .finally(() => setLoading(false));
    }
  }, [idCategorie]);

  const [fontsLoaded] = useFonts({  //chargement des polices
    Poppins_700Bold,
    Poppins_400Regular,
  });

  // if (loading) return <Text>Chargement...</Text>;
  if (!fontsLoaded) return null; //rh mbola tsy chargé de null


  //Structure principale
  return (
    <View style={styles.container}>
      {stories.length === 0 ? (
        <Text style={styles.tsisyText}>Tsisy "{category}"</Text>
      ) : (
        //Sinon Affichage Flatlist 
        <FlatList
          data={stories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            // console.log("Élément reçu:", item);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('TantaraDetails', { story: item })}
                activeOpacity={0.85}
              >
                <View style={styles.cardContent}>
                  <View style={styles.textSection}>
                    <Text style={styles.title}>{item.titre}</Text>
                    <Text style={styles.excerpt}>{item.extrait}</Text>
                  </View>
                  {item.illustration && (
                    <Image
                      source={{ uri: `${BASE_URL}/static/${item.illustration.trim()}` }}
                      style={{ width: 115, height: 150 }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF7F0',
    flex: 1,
  },

  //texte afficheny rh vide
  tsisyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },

  //Card 
  card: {
    backgroundColor: '#FCE6A7',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    overflow: 'hidden',
  },

  //cardContent
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //section misy texte
  textSection: {
    flex: 1,
    padding: 12,
  },

  //titre angnao
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    color: '#4A4A4A',
    marginBottom: 4,
  },

  //texte
  excerpt: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#4A4A4A',
  },

  //image 
  image: {
    width: 100,
    height: 100,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    resizeMode: 'cover',
  },
});

export default TantaraListScreen;  //amzay accessible

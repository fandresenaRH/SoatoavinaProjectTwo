import React from "react";
import {View,Text,Image,FlatList,StyleSheet,Dimensions,TouchableOpacity,} from "react-native"; //Dimensions: utilitaires d'écran 
import { useNavigation } from "@react-navigation/native";  //Navigation impérative depuis un compsant fonctionnel
import {useFonts,Poppins_700Bold,Poppins_400Regular,} from "@expo-google-fonts/poppins"; // import police Poppins, useFonts: hook Expo/Google Fonts micharger police

//Tableau catégories de angano
const categories = [
  { id: "1", title: "Mampalahelo", image: require("@/assets/images/mampalahelo.png"), backgroundColor: "#7BCBBE", height: 220 },  //le couleur samy manana ny azy selon anle sary
  { id: "2", title: "Mampihomehy", image: require("@/assets/images/africain.jpg"), backgroundColor: "#C5D3C4", height: 250 }, //height: hauteur personnalisé samy manana ny azy
  { id: "3", title: "Mananatra", image: require("@/assets/images/mananatra.png"), backgroundColor: "#7BCBBE", height: 250 },
  { id: "4", title: "Mampatahotra", image: require("@/assets/images/mampitahotra.png"), backgroundColor: "#C5D3C4", height: 220 }
];

const screenWidth = Dimensions.get("window").width;  //ahazoana largeur de l'écran
const cardWidth = screenWidth / 2 - 15;  //dimensions de chaque card: largeur / 2 - 15px


{/* Cliquable chaque card*/}
const CategoryCard = ({ title, image, backgroundColor, height, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85}>  
    <View style={[styles.card, { height }]}>
      <Image source={image} style={styles.image} />
      <View style={[styles.titleContainer, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


// Récupère l'objet navigation pour pousser un nouvel écran
const Categories = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({  //chargement police 
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null; // tsisy rendu rh mbola tsy chargé ny police
  }

  //rend une grille de card
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={2}  // 2 colonnes
      renderItem={({ item }) => (
        <CategoryCard
          title={item.title}
          image={item.image}
          backgroundColor={item.backgroundColor}
          height={item.height}
          onPress={() => navigation.navigate("TantaraList", { 
            idCategorie: item.id, 
            category: item.title 
          })}
           //misediriger vers TantaraList selon la catégorie
        />
      )}
      contentContainerStyle={styles.container}  //padding global
      columnWrapperStyle={styles.columnWrapper} // aligne chaque ligne
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, //marge interne
    backgroundColor: "#FFF7F0",
  },

  columnWrapper: {
    justifyContent: "space-between",  //écart des 2 card équitablement
  },


  //chaque card
  card: {
    width: cardWidth,
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,  //ombre 
  },


  //image
  image: {
    width: "100%",  //micouvrir toute la card le image
    height: "100%",
  },
 
  //partie soratra ambany
  titleContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },


  //style du texte
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: '#4A4A4A',
  },
});

export default Categories;

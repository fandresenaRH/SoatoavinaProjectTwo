import React, { useRef, useState } from 'react';  //importations hooks
import {View,Text,StyleSheet,Dimensions,Animated,Image} from 'react-native';
import * as Progress from 'react-native-progress';  //barre de navigation
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';  //hooks expo police
import {BASE_URL} from '../api/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const HEADER_MAX_HEIGHT = Dimensions.get('window').height;  //plein écran
const HEADER_MIN_HEIGHT = 130;  //hauteur minimale reefa après scrollena vers le bas 

export default function TantaraDetails({ route }) { //route: contient les paramètres de navigation
  const { story } = route.params || {};   //récupération de l'objet story passé en paramètre de l’écran teo aloha
  const [progress, setProgress] = useState(0);  //progress: val entre 0 et 1 pour la barre de progression, usetate(0): initialisation à 0 (en haut)

  const scrollY = useRef(new Animated.Value(0)).current;  //valeur d’animation amle scroll
  const scrollRef = useRef(null);  

  //Gestion du scroll
  const handleScroll = (e) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;  //destructuring: récupération données natives du scroll:
    
    if (!contentOffset || !contentSize || !layoutMeasurement) return;  

    //Calcul de la progression
    const totalScrollable = contentSize.height - layoutMeasurement.height; //h totale du contenu scrollable - taille visible de la fenêtre
    const current = contentOffset.y; //Position actuelle du scroll(vertical)
    const ratio = totalScrollable > 0 ? current / totalScrollable : 0;  //firy % zay novakiana : pixel défilé / pixel total scrollable
    setProgress(ratio);  //Mise à jour de l’état de la barre
  };

  const [fontsLoaded] = useFonts({  //chargement police
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return null;  //null tsisyaffichage rh mbola tsy chargé

  //Interpolation - Manova hauteur anle image au fur du scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],  // Plage d'entrée : valeurs de scrollY entre 0 sy le hauteur min tokony hijanonanle image
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],    // Plage de sortie :  hauteur anle image pour chaque valeur de scrollY
    extrapolate: 'clamp',  // mi empêcher animation midépasse valeur max sy min
  });

  //Interpolation - Mampiseho titre
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT * 0.5],  // Plage d'entrée : de 0 (haut de l’écran) hatram moitié an'i hauteur anle image reefa pleine
    outputRange: [0, 1], // Plage de sortie : opacité de 0 (invisible) à 1 (complètement visible)
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Progress.Bar 
        progress={progress} 
        width={null}
        height={5}
        borderWidth={0} 
        animated  
        unfilledColor="#FFEAD0" 
        color="#F8AF4B" 
        style={styles.progress}
      />

      {story.illustration &&(
          <Animated.Image
            source={{ uri: `${BASE_URL}/static/${story.illustration.trim()}` }}
            style={[styles.image, { height: headerHeight }]}  
            resizeMode="cover"
          />  
      )}
      <Animated.ScrollView
        ref={scrollRef}  //attacher une référence à scrollview
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { listener: handleScroll, useNativeDriver: false }
        )}  //isakin'ny mi scroll de appelé fonction handleScroll
        scrollEventThrottle={16}  //Délai min 16 ms
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT, paddingBottom: 40 }}  //padding interne haut = hauteur image
        showsVerticalScrollIndicator={false}  //cacher la barre native
      >
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}> 
          {story.titre}
        </Animated.Text>
        <Text style={styles.content}>{story.texte}</Text>      
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  //remplit l'écran
    backgroundColor: '#FFF7F0',
  },

  image: {
    position: 'absolute',  //apetraka eo ambony le image
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    zIndex: 1,  //au-dessus du scroll
  },

  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginHorizontal: 18,
    marginTop: 20,
    color: '#4A4A4A',
  },

  //barre
  progress: {
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 4,
    zIndex: 2,  //par-dessus l’image
  },

  content: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: '#4A4A4A',
    textAlign: 'justify',
    paddingHorizontal: 18,
    marginTop: 15,
  },
});

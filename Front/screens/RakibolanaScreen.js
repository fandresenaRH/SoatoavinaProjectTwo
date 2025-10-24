import React, { useState, useRef } from 'react';

//keuboard: contrôle anle clavier
import {View,Text,TextInput,StyleSheet,Animated,Keyboard,TouchableWithoutFeedback,TouchableOpacity,Platform,FlatList,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';  //icône loupe
import { LinearGradient } from 'expo-linear-gradient';  //fond dégradé
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';  //police
import {API, BASE_URL} from '../api/api';


 // <Animated.View style={[styles.resultContainer, { transform: [{ translateY: slideAnim }] }]}> 
          //   <Text style={styles.soatoavina}>{result.nomSoatoavina}</Text>

          //   <Text style={styles.section}>FAMARITANA</Text>
          //   <Text style={styles.definition}>{result.definition}</Text>

          //   <Text style={styles.section}>FANAZAVANA</Text>
          //   <Text style={styles.definition}>{result.explication}</Text>

          //   <Text style={styles.section}>FIAVIANA</Text>
          //   <Text style={styles.definition}>{result.origine}</Text>

          //   <TouchableOpacity style={styles.ohabolanaBtn} onPress={()=>navigation.navigate('Ohabolana')}>  
          //     <Ionicons name="chatbubble-ellipses-outline" size={16} color="#f4b860" />
          //     <Text style={styles.ohabolanaText}>OHABOLANA</Text>
          //   </TouchableOpacity>
          // </Animated.View>


export default function RakibolanaScreen({navigation}) {
  const [searchText, setSearchText] = useState('');  //texte recherché, initialisation chaîne vide
  const [showResult, setShowResult] = useState(false);  //mbola tsy affiché le resulatat
  const slideAnim = useRef(new Animated.Value(400)).current;  //animation affichage du card de résultat, 400px
  const [result, setResult] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;


  const handleSearch = async () => {
    Keyboard.dismiss();  
    try {
      const response = await API.get(`soatoavina/recherche`, {
        params: { nom: searchText },
      });

      setResult(response.data);
      setShowResult(true);  
      
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();  
    } catch (error) {
      console.error("Erreur : ", error);
      Alert.alert("Soatoavina tsy hita", "Tsy misy valiny amin'ny anarana naroso.");
      setShowResult(false);
    }
  };

  // const renderItem = ({ item }) => (
  //   <Animated.View style={[styles.resultContainer, { transform: [{ translateY: slideAnim }] }]}> 
  //             <Text style={styles.soatoavina}>{result.nomSoatoavina}</Text>
  
  //             <Text style={styles.section}>FAMARITANA</Text>
  //             <Text style={styles.definition}>{result.definition}</Text>
  
  //             <Text style={styles.section}>FANAZAVANA</Text>
  //             <Text style={styles.definition}>{result.explication}</Text>
  
  //             <Text style={styles.section}>FIAVIANA</Text>
  //             <Text style={styles.definition}>{result.origine}</Text>
  
  //             <TouchableOpacity style={styles.ohabolanaBtn} onPress={()=>navigation.navigate('Ohabolana')}>  
  //               <Ionicons name="chatbubble-ellipses-outline" size={16} color="#f4b860" />
  //               <Text style={styles.ohabolanaText}>OHABOLANA</Text>
  //             </TouchableOpacity>
  //           </Animated.View>
  // );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <LinearGradient
        colors={['#FFF7F0', '#FCE6A7']}  
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.title}>Hitady Soatoavina</Text>  

        <View style={styles.searchBar}>  
          <Ionicons  
            name="search"
            size={20}
            color="#aaa"
            style={styles.searchIcon}
            onPress={handleSearch}  
          />
          <TextInput
            style={styles.input}
            placeholder="Hasina"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>

  
        {showResult && (  
          //  <FlatList
          //  data={result}
          //  keyExtractor={(item) => item.idSoatoavina.toString()}
          //  renderItem={renderItem}
          // />
          <Animated.View style={[styles.resultContainer, { transform: [{ translateY: slideAnim }] }]}> 
            <View style={styles.corps}>
              <ScrollView
                // style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.soatoavina}>{result.nomSoatoavina}</Text>

                <Text style={styles.section}>FAMARITANA</Text>
                <Text style={styles.definition}>{result.definition}</Text>

                <Text style={styles.section}>FANAZAVANA</Text>
                <Text style={styles.definition}>{result.explication}</Text>

                <Text style={styles.section}>FIAVIANA</Text>
                <Text style={styles.definition}>{result.origine}</Text>

                <TouchableOpacity style={styles.ohabolanaBtn} onPress={()=>navigation.navigate('Ohabolana')}>  
                  <Ionicons name="chatbubble-ellipses-outline" size={16} color="#f4b860" />
                  <Text style={styles.ohabolanaText}>OHABOLANA</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Animated.View>
        
        )}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 80 : 120,
  },
  //titre
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    alignSelf: 'center',
    marginBottom: 28,
    color: '#4A4A4A',
  },
  //barre de recherche
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FEB937',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  //icône loupe
  searchIcon: {
    marginRight: 8,
    color: '#FEB937',
  },
  //input recherche
  input: {
    flex: 1,
    fontStyle: 'italic',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  corps:{
    borderRadius: 40,
    paddingRight : 20,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  //box de résultat
  resultContainer: {
    flex: 1,                // Ajoute cette ligne
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxHeight: '70%',       // Optionnel : limite la hauteur visible
  },
  //soatoavina  (ici: Hasina)
  soatoavina: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    marginBottom: 12,
    color: '#4A4A4A',
  },
  //Famaritana fanazavana Fiaviana
  section: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 6,
    color: '#4A4A4A',
  },
  //Famaritana fanazavana Fiaviana
  definition: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#4A4A4A',
  },
  // Bouton Ohabolana
  ohabolanaBtn: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  //Texte ohabolana
  ohabolanaText: {
    color: '#FEB937',
    marginLeft: 8,
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
  },
});

import React, { useState, useEffect, useContext} from 'react';    //hooks
import { View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';   //Compsant UI
import { NavigationContainer } from '@react-navigation/native';  //navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  //Manao tab Navigator (barre d'onglets)
import { createStackNavigator } from '@react-navigation/stack';  //stack Navigator (pile d'écrans)
import Icon from 'react-native-vector-icons/FontAwesome'
import { Ionicons } from '@expo/vector-icons';  //icône am barre de navigation
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';  //chargement police
import * as Font from 'expo-font';
import { ThemeContext, LanguageContext } from "../component/AppContext"; //mode nuit/jour malagasy /anglais 

import HomeScreen from '@/screens/HomeScreen';  //Fandraisana
import TantaraScreen from '@/screens/TantaraScreen';  //Angano
import Ohabolana2 from '@/screens/Ohabolana2';  //Ohabolana
import Fianarana from '@/screens/Fianarana'; 
import RakibolanaScreen from '@/screens/RakibolanaScreen';  //Rakibolana Soatoavina
import TantaraList from '@/component/TantaraList';  //Liste ana angano (2eme page de Angano)
import TantaraDetails from '@/component/TantaraDetails';  //Lecture Angano (3eme page de Angnao)
import Fihavanana1 from '@/screens/Ecran_ohabolana/Fihavanana/Fihavanana1'
import Fihavanana2 from '@/screens/Ecran_ohabolana/Fihavanana/Fihavanana2'
import Fihavanana3 from '@/screens/Ecran_ohabolana/Fihavanana/Fihavanana3'
import Fihavanana4 from '@/screens/Ecran_ohabolana/Fihavanana/Fihavanana4'
import Chat from '@/component/chat'

const Stack = createStackNavigator();  //Instanciation
const Tab = createBottomTabNavigator();

//Pile de navigation an'i Fandraisana
function LibraryStack({navigation}) {  
  return (
    <Stack.Navigator  
      screenOptions={{    //Options communes à tous les écrans anio pile io
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',  //écran enfant_police d'entête
        },
      }}
    >
      <Stack.Screen  //Ecran Fandraisana
        name="Fandraisana"
        component={HomeScreen}
        options={{  //Style de la barre d'entête
          title: "Tongasoa!",
          headerStyle: { backgroundColor: '#FFF7F0' },
          headerTitleStyle: {
            fontFamily: 'PlayfairDisplay_700Bold',
            fontSize: 25,
            color: '#5A4A42',
            marginLeft: 10,
          },
          headerLeft: () => (  //icone parametre
            <TouchableOpacity onPress={()=>navigation.navigate('Parametre')}>
              <Icon name ="cog" size={30} />
            </TouchableOpacity>

          ),
          headerRight: () => (  //Logo ISPM ambony à droite
            <Image
              source={require('@/assets/images/ispm.png')}
              style={{ width: 120, height: 110, marginRight: 20,marginTop:70 }}
            />
          ),
        }}
      />

      {/* Ajout des 3 autres écrans amle aby am Fandraisana */}
      <Stack.Screen name="TantaraList" component={TantaraList} options={{ title: 'Sokajy' }} />  
      <Stack.Screen name="TantaraDetails" component={TantaraDetails} options={{ title: '' }} />  
      <Stack.Screen name="TantaraScreen" component={TantaraScreen} options={{ title: 'Angano' }} /> 
    </Stack.Navigator>
  );
}

//Pile de navigation an'i Angano
function TantaraStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',  //Police d'entête an'i écran rehetra
        },
      }}
    >
      {/* Ajout des 3 autres écrans miainga am  Angano */}
      <Stack.Screen name="TantaraScreen" component={TantaraScreen} options={{ title: 'Angano' }} />  
      <Stack.Screen name="TantaraList" component={TantaraList} options={{ title: 'Sokajy' }} />
      <Stack.Screen name="TantaraDetails" component={TantaraDetails} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function OhabolanaScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',  //Police d'entête an'i écran rehetra
        },
      }}
    >
      {/* Ajout des 4 autres écrans miainga am  OHABOLANA */}
      <Stack.Screen name="Ohabolana2" component={Ohabolana2} options={{headerShown: false}}/>
      <Stack.Screen name="Fihavanana1" component={Fihavanana1} options={{headerShown: false}}/>
      <Stack.Screen name="Fihavanana2" component={Fihavanana2} options={{headerShown: false}}/>
      <Stack.Screen name="Fihavanana3" component={Fihavanana3} options={{headerShown: false}}/> 
      <Stack.Screen name="Fihavanana4" component={Fihavanana4} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function FianaranaScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',  //Police d'entête an'i écran rehetra
        },
      }}
    >
      {/* Ajout des 2 autres écrans miainga am  chatbot */}
    <Stack.Screen name="FianaranaScreen" component={Fianarana} options={{headerShown: false}}/>
    <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/> 
    </Stack.Navigator>
  );
}

export default function BottomTab() {
  const [fontsLoaded, setFontsLoaded] = useState(false);  //Garder une trace de changements des polices

   // mode nuit et jour
 const { isDarkMode } = useContext(ThemeContext);
 // malagasy/anglais
 const { language } = useContext(LanguageContext);

  useEffect(() => {  //Fonction pour éviter de montrer l'app tant que les polices ne sont pas chargées
    async function loadFonts() {
      await Font.loadAsync({
        PlayfairDisplay_700Bold,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {  //mamoka spinner izy rah mbola tsy chargé le police
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return ( 
      <Tab.Navigator
        initialRouteName='Fandraisana'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Fandraisana':
                iconName = 'home-outline';
                break;
              case 'Rakibolana':
                iconName = 'school-outline';  //Icône pour chaque onglet (Ionicons) 
                break;
              case 'Angano':
                iconName = 'book-outline';
                break;
              case 'Fianarana':
                iconName = 'chatbubbles-outline';
                break;
              case 'Ohabolana':
                iconName = 'bulb-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }
            return <Ionicons name={iconName} size={size} color={color}/>
          },
          tabBarActiveTintColor: '#FEB937',  //Couleur an'i icône reefa sélectionné
          tabBarInactiveTintColor: '#837E7E',  //Reefa tsia
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular', // Police anle soratra eo ambany
          },
          tabBarStyle: {
            // backgroundColor: '#FCEFE4',  //Fond de la barre d'onglets
            backgroundColor: isDarkMode ? "#121212" : "#FCEFE4",
            borderTopWidth: 0,
            elevation: 0,  //tsisy ombre
          },
        })}
      >

        <Tab.Screen name="Rakibolana" component={RakibolanaScreen} />
        <Tab.Screen name="Angano" component={TantaraStack} options={{ title: 'Angano' }} />
        <Tab.Screen name="Fandraisana" component={LibraryStack} />
        <Tab.Screen name="Ohabolana" component={OhabolanaScreen} />
        <Tab.Screen name="Fianarana" component={FianaranaScreen} />
      </Tab.Navigator>
  );
}


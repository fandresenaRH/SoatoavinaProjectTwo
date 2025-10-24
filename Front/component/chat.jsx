import React, { useState,useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ThemeContext, LanguageContext } from "../component/AppContext";


export default function Chat(){

  // mode nuit et jour
  const { isDarkMode } = useContext(ThemeContext);
  // malagasy/anglais
  const { language } = useContext(LanguageContext);
    
  // État pour stocker tous les messages de la conversation
  // On initialise avec un message par défaut du "bot"
  const [messages, setMessages] = useState([
    { text: "Salama tompoko, inona no azoko anampina anao azafady ?", sender: 'bot' }
  ]);
  // État pour stocker le texte actuellement tapé par l'utilisateur
  const [currentMessage, setCurrentMessage] = useState('');

  /**
   * Gère l'envoi d'un message.
   * Ajoute le message de l'utilisateur à la liste et vide le champ de saisie.
   */
  const handleSendMessage = () => {
    if (currentMessage.trim()) { // Vérifie que le message n'est pas vide ou juste des espaces
      // Ajoute le message de l'utilisateur au tableau des messages
      setMessages(prevMessages => [
        ...prevMessages,
        { text: currentMessage.trim(), sender: 'user' },
      ]);
      // Réinitialise le champ de saisie
      setCurrentMessage('');
    }
  };

  // css
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      // backgroundColor: '#FFF7F7',
      backgroundColor: isDarkMode ? "#2A2A3E" : "#FFF7F7",
    },
    containerHaut:{
      height:120,
      width:389,
      borderBottomLeftRadius:100,
      borderBottomRightRadius:100,
      // backgroundColor:"white",
      backgroundColor: isDarkMode ? "black" : "#FFF7F7",
    },
    container: {
      flex: 1,
    },
    image:{
      height:100,
      width:100,
      marginTop:20,
      marginLeft:"35%"
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      padding: 10,
    },
    messageBubble: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginBottom: 8,
      maxWidth: '80%',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#FFA6A8',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#A6D1FF',
    },
    otherMessageText: {
      color: '#333', // Couleur de texte pour les messages du bot
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderColor: '#ddd',
      // backgroundColor: '#FFF7F7',
      backgroundColor: isDarkMode ? "#2A2A3E" : "#FFF7F7",
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor:"#FEB937",
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      marginRight: 10,
      maxHeight: 100,
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerHaut}>
        <Image source={require('@/assets/images/chatBot1-removebg-preview.png')} style={styles.image}/>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
      >
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {/* Affiche les messages. Si l'utilisateur n'a pas encore tapé, seul le message par défaut s'affiche.
              Dès que l'utilisateur entre un message, le message par défaut est remplacé par son message. */}
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userMessage : styles.otherMessage,
              ]}
            >
              <Text style={msg.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={currentMessage}
            onChangeText={setCurrentMessage} // Met à jour currentMessage à chaque frappe
            placeholder="  Mametraha fanontaniana"
            multiline
            placeholderTextColor="#888"
            backgroundColor="white"
            // backgroundColor= isDarkMode ? "#3A3A4E" = "#FFF7F7"

          />
           <TouchableOpacity
            onPress={handleSendMessage}
           >
              <Icon name="send" size={16} style={styles.Iconedit} color='#FEB937'/>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


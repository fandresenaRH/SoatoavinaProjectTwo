// BackgroundGradient.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BackgroundGradient({ children }) {
  return (
    <LinearGradient
      // Couleurs du dégradé (même ordre que sur ton PNG)
      colors={['#FFA6A8', '#FCE9A7']}           // rose clair -> jaune pastel
      start={{ x: 0, y: 0}}                    // coin haut‑gauche
      end={{   x: 1, y: 1 }}                    // coin bas‑droit
      style={styles.container}
    >
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

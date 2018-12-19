import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export const Footer = () => (
  <View style={styles.footer}>

  </View>
);

const styles = StyleSheet.create({
  footer: {
    height: Platform.OS === 'android' ? 20 : 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
    ...Platform.select({
      ios: { backgroundColor: '#f00', paddingBottom: 24},
      android: { backgroundColor: '#00f'}
    }),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 24
  }
});
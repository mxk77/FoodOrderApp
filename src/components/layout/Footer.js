// src/components/layout/Footer.js
import React from 'react';
import { View, Text, Pressable, Linking, SafeAreaView } from 'react-native';

export default function Footer() {
  const year = new Date().getFullYear();

  const dial = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
      }}
    >
      <View style={{ padding: 12, alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
          © {year} FoodDelivery
        </Text>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Pressable onPress={() => dial('+380001112233')}>
            <Text style={{ fontSize: 14, color: '#007aff' }}>
              (000) 111-22-33
            </Text>
          </Pressable>
          <Pressable onPress={() => dial('+380004445566')}>
            <Text style={{ fontSize: 14, color: '#007aff' }}>
              (000) 444-55-66
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
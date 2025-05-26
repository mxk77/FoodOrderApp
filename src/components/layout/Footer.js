import React from 'react';
import { View, Text, Pressable, Linking, SafeAreaView } from 'react-native';
import styles from './FooterStyles';

export default function Footer() {
  const year = new Date().getFullYear();
  const primaryPhoneNumber = '+380001112233';
  const primaryPhoneNumberDisplay = '(000) 111-22-33';

  const dialPrimaryNumber = () => {
    Linking.openURL(`tel:${primaryPhoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.copyrightText}>
          © {year} FoodDelivery
        </Text>
        <Pressable onPress={dialPrimaryNumber} style={styles.contactPressable}>
          <Text style={styles.contactText}>
            Зв'язатися з нами: {primaryPhoneNumberDisplay}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
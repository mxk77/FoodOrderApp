// Footer.js
import React from 'react';
import { View, Text, Linking, Pressable, Dimensions } from 'react-native';
import { staticStyles, getDynamicStyles, themeFonts } from '../../styles/FooterStyles'; // Adjust path if needed

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const screenWidth = Dimensions.get('window').width;

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const isLargeScreen = screenWidth >= 600;
  const dynamicStyles = getDynamicStyles(isLargeScreen); // Generate dynamic styles

  return (
    <View style={staticStyles.appFooter}>
      <View style={dynamicStyles.content}>
        <Text style={[staticStyles.text, dynamicStyles.copyright]}>
          &copy; {currentYear} FoodDelivery
        </Text>
        <View style={dynamicStyles.contacts}>
          <Pressable onPress={() => handlePhonePress('+380001112233')}>
            {({ pressed }) => (
              <Text style={[
                staticStyles.phoneLink,
                pressed && staticStyles.phoneLinkHover // Hover style is static in definition
              ]}>
                (000) 111-22-33
              </Text>
            )}
          </Pressable>
          <Pressable onPress={() => handlePhonePress('+380004445566')}>
            {({ pressed }) => (
              <Text style={[
                staticStyles.phoneLink,
                pressed && staticStyles.phoneLinkHover
              ]}>
                (000) 444-55-66
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
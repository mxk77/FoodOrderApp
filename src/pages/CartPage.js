// src/pages/CartPage.js (or your chosen path)

import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import Layout from '../components/layout/Layout'; // Adjust path
import { useCart } from '../context/CartContext'; // Adjust path
import { styles as staticStyles, getDynamicCartStyles } from '../styles/CartPageStyles'; // Adjust path
// You might want to import your global H1 style or make a custom H component
// import globalStyles from '../globalStyles';

// The 'navigation' prop is passed by React Navigation
export default function CartPage({ navigation }) {
  const { items, removeItemById, clearCart, total } = useCart();
  const dynamicStyles = getDynamicCartStyles(); // Get responsive styles

  const handleCheckout = () => {
    navigation.navigate('Confirmation');
  };

  const handleBackToMenu = () => {
    navigation.navigate('Menu'); // Or navigation.goBack();
  };

  const renderCartItem = ({ item }) => (
    <View style={staticStyles.cartItemContainer}>
      <Text style={staticStyles.cartItemDetails}>
        {item.name} (x{item.quantity || 1}) — {item.price * (item.quantity || 1)} грн
      </Text>
      <Pressable
        onPress={() => removeItemById(item.id)}
        style={({ pressed }) => [
          staticStyles.removeButton,
          pressed && staticStyles.removeButtonPressed, // Apply pressed style for background
        ]}
        accessibilityLabel="Видалити товар"
        accessibilityRole="button"
      >
        {({ pressed }) => (
          <Text style={[
            staticStyles.removeButtonText,
            pressed && staticStyles.removeButtonTextPressed, // Apply pressed style for text color
          ]}>
            ×
          </Text>
        )}
      </Pressable>
    </View>
  );

  const ItemSeparator = () => <View style={staticStyles.itemSeparator} />;

  return (
    <Layout currentRouteName="Cart">
      <View style={staticStyles.cartPageContainer}>
        <Text style={staticStyles.title}>Кошик</Text>

        {items.length === 0 ? (
          <View style={staticStyles.emptyMessageContainer}>
            <Text style={staticStyles.emptyMessageText}>Ваш кошик порожній.</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id.toString()}
              style={staticStyles.cartItemsList}
              ItemSeparatorComponent={ItemSeparator}
            />
            <Text style={staticStyles.totalText}>Всього: {total} грн</Text>
            <View style={dynamicStyles.actionsContainer}>
              <Pressable
                onPress={handleCheckout}
                style={({ pressed }) => [
                  staticStyles.actionButtonBase,
                  staticStyles.primaryButton,
                  dynamicStyles.actionButton, // For width/flexGrow
                  pressed && staticStyles.primaryButtonPressed,
                ]}
                accessibilityRole="button"
              >
                <Text style={[staticStyles.actionButtonText, staticStyles.primaryButtonText]}>
                  Оформити замовлення
                </Text>
              </Pressable>
              <Pressable
                onPress={clearCart}
                style={({ pressed }) => [
                  staticStyles.actionButtonBase,
                  staticStyles.dangerButton,
                  dynamicStyles.actionButton, // For width/flexGrow
                  pressed && staticStyles.dangerButtonPressed,
                ]}
                accessibilityRole="button"
              >
                <Text style={[staticStyles.actionButtonText, staticStyles.dangerButtonText]}>
                  Очистити кошик
                </Text>
              </Pressable>
            </View>
          </>
        )}

        <View style={staticStyles.backLinkContainer}>
          <Pressable
            onPress={handleBackToMenu}
            style={({ pressed }) => [
              staticStyles.backLinkPressable,
              pressed && staticStyles.backLinkPressablePressed,
            ]}
            accessibilityRole="link"
          >
            {({ pressed }) => (
              <Text style={[
                staticStyles.backLinkText,
                pressed && staticStyles.backLinkTextPressed,
              ]}>
                ← Повернутись до меню
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Layout>
  );
}
// src/pages/CartPage.js
import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import Layout from '../components/layout/Layout';
import styles from '../styles/CartPageStyles';
import { useCart } from '../context/CartContext';

export default function CartPage({ navigation }) {
  const { items, removeItemById, clearCart, total } = useCart();

  const handleCheckout = () => navigation.navigate('Confirmation');
  const handleBackToMenu = () => navigation.navigate('Menu');

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>
        {item.name} (x{item.quantity || 1}) — {item.price * (item.quantity || 1)} грн
      </Text>
      <Pressable
        onPress={() => removeItemById(item.id)}
        style={({ pressed }) => [
          styles.removeBtn,
          pressed && styles.removeBtnPressed,
        ]}
      >
        <Text style={styles.removeBtnText}>×</Text>
      </Pressable>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Кошик</Text>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Ваш кошик порожній.</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              style={styles.list}
            />

            <Text style={styles.total}>Всього: {total} грн</Text>

            <View style={styles.actions}>
              <Pressable
                onPress={handleCheckout}
                style={({ pressed }) => [
                  styles.button,
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
              >
                <Text style={[styles.buttonText, styles.primaryButtonText]}>
                  Оформити замовлення
                </Text>
              </Pressable>

              <Pressable
                onPress={clearCart}
                style={({ pressed }) => [
                  styles.button,
                  styles.dangerButton,
                  pressed && styles.dangerButtonPressed,
                ]}
              >
                <Text style={[styles.buttonText, styles.dangerButtonText]}>
                  Очистити кошик
                </Text>
              </Pressable>
            </View>
          </>
        )}

        <Pressable onPress={handleBackToMenu} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Повернутись до меню</Text>
        </Pressable>
      </View>
    </Layout>
  );
});

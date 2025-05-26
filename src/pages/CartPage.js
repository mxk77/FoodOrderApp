// src/pages/CartPage.js
import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import Layout from '../components/layout/Layout';
// import { styles as staticStyles, getDynamicCartStyles } from '../styles/CartPageStyles';
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  cartItemText: {
    flex: 1,
    fontSize: 16,
  },
  removeBtn: {
    marginLeft: 12,
    padding: 4,
  },
  removeBtnPressed: {
    opacity: 0.6,
  },
  removeBtnText: {
    fontSize: 18,
    color: '#d00',
  },
  separator: {
    height: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007aff',
  },
  primaryButtonPressed: {
    backgroundColor: '#005bb5',
  },
  primaryButtonText: {
    color: '#fff',
  },
  dangerButton: {
    backgroundColor: '#d00',
  },
  dangerButtonPressed: {
    backgroundColor: '#a00',
  },
  dangerButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  backLinkText: {
    fontSize: 14,
    color: '#007aff',
  },
});

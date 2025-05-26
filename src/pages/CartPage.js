import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native'; // Видалено ScrollView
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
        {item.name} (x{item.quantity || 1}) —{' '}
        {item.price * (item.quantity || 1)} грн
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

  const ListHeader = () => <Text style={styles.title}>Кошик</Text>;

  const ListFooter = () => (
    // Цей View відображається лише якщо є товари в кошику
    <View style={styles.listFooterContainer}>
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
      <Pressable onPress={handleBackToMenu} style={styles.backLink}>
        <Text style={styles.backLinkText}>← Повернутись до меню</Text>
      </Pressable>
    </View>
  );

  const EmptyList = () => (
    // Цей компонент відображається, коли список порожній
    // Заголовок вже буде відображено через ListHeaderComponent
    <View style={styles.emptyListContent}>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Ваш кошик порожній.</Text>
      </View>
      <Pressable onPress={handleBackToMenu} style={[styles.backLink, styles.backLinkEmptyPage]}>
        <Text style={styles.backLinkText}>← Повернутись до меню</Text>
      </Pressable>
    </View>
  );

  return (
    <Layout>
      {/* cardWrapper тепер є контейнером для FlatList і має flex: 1 */}
      <View style={styles.cardWrapper}>
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={ListHeader} // Заголовок буде завжди видимий
          ListFooterComponent={items.length > 0 ? ListFooter : null} // Футер тільки якщо є товари
          ListEmptyComponent={EmptyList} // Компонент для порожнього списку
          style={styles.flatListItself} // Стилі для самого компонента FlatList
          contentContainerStyle={styles.flatListContentContainer} // Стилі для внутрішнього контейнера FlatList
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}
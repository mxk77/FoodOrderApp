// src/pages/MenuPage.js
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import MENU_ITEMS_DATA from '../data/menuData.js';
import styles from '../styles/MenuPageStyles';

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const setCat = new Set(MENU_ITEMS_DATA.map(item => item.category));
    return ['All', ...Array.from(setCat)];
  }, []);

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'All'
        ? MENU_ITEMS_DATA
        : MENU_ITEMS_DATA.filter(item => item.category === selectedCategory),
    [selectedCategory]
  );

  const renderCategoryButton = (category) => (
    <Pressable
      key={category}
      onPress={() => setSelectedCategory(category)}
      style={({ pressed }) => [
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive,
        pressed && selectedCategory !== category && styles.categoryButtonPressed,
      ]}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.categoryButtonTextActive,
        ]}
      >
        {category === 'All' ? 'Всі категорії' : category}
      </Text>
    </Pressable>
  );

  const renderMenuItem = useCallback(
    ({ item }) => (
      <View style={styles.menuCardContainer}>
        <View style={styles.menuCard}>
          <Image source={item.imagePath} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {item.description}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>{item.price} грн</Text>
              <Pressable onPress={() => addToCart(item)} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    ),
    [addToCart]
  );

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>Меню</Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => renderCategoryButton(item)}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryFiltersContentContainer}
      />
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.noItemsContainer}>
      <Text style={styles.noItemsText}>В цій категорії товари відсутні.</Text>
    </View>
  );

  return (
    <Layout>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.menuGridContainer}
        ListEmptyComponent={ListEmpty}
      />
    </Layout>
  );
}

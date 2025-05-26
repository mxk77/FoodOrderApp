// src/pages/MenuPage.js
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import MENU_ITEMS_DATA from '../data/menuData.js';
// import { styles } from '../styles/MenuPageStyles';

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

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  categoryFiltersContentContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryButton: {
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#007aff',
  },
  categoryButtonPressed: {
    backgroundColor: '#d0d0d0',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  menuGridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  menuCardContainer: {
    flex: 1,
    margin: 8,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
  },
  noItemsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noItemsText: {
    fontSize: 16,
    color: '#666',
  },
});

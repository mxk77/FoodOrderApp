// src/pages/MenuPage.js
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, FlatList, Pressable, Image } from 'react-native';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import MENU_ITEMS_DATA from '../data/menuData.js';
import { styles } from '../styles/MenuPageStyles'; // Or your actual path

export default function MenuPage({ navigation }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(MENU_ITEMS_DATA.map(item => item.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return MENU_ITEMS_DATA;
    }
    return MENU_ITEMS_DATA.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategoryButton = (category) => (
    <Pressable
      key={category}
      onPress={() => setSelectedCategory(category)}
      style={({ pressed }) => [
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive,
        pressed && selectedCategory !== category && styles.categoryButtonPressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: selectedCategory === category }}
    >
      {({ pressed }) => (
        <Text style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.categoryButtonTextActive,
          pressed && selectedCategory !== category && styles.categoryButtonTextPressed,
        ]}>
          {category === 'All' ? 'Всі категорії' : category}
        </Text>
      )}
    </Pressable>
  );

  const renderMenuItem = useCallback(({ item }) => (
    <View style={styles.menuCardContainer}>
      <Pressable
        style={({ pressed }) => [styles.menuCard, pressed && styles.menuCardPressed]}
        accessibilityLabel={item.name}
        accessibilityRole="button"
      >
        <View style={styles.imageContainer}>
          <Image
            source={item.imagePath}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{item.price} грн</Text>
            <Pressable
              onPress={() => addToCart(item)}
              style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
              accessibilityLabel={`Додати ${item.name} до кошика`}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  ), [addToCart]);

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Меню</Text>
      <View style={styles.categoryFiltersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryFiltersContentContainer}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>
    </>
  );

  const ListEmpty = () => (
    <View style={styles.noItemsContainer}>
      <Text style={styles.noItemsText}>В цій категорії товари відсутні.</Text>
    </View>
  );

  return (
    <Layout currentRouteName="Menu">
      {/* The FlatList is now the primary scrollable element for the page content */}
      <FlatList
        ListHeaderComponent={ListHeader} // Renders title and category filters
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.menuGridContainer} // Styles for the grid itself
        ListEmptyComponent={ListEmpty} // Renders if filteredItems is empty
        style={styles.pageContainer} // Overall container style for the list area
      />
    </Layout>
  );
}
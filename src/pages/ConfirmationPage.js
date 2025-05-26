// src/pages/ConfirmationPage.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Layout from '../components/layout/Layout'; // Adjust path
import { useCart } from '../context/CartContext';   // Adjust path
import { styles } from '../styles/ConfirmationPageStyles';  // Adjust path
import theme from '../styles/theme'; // For placeholderTextColor if needed

// Custom Radio Button Component
const CustomRadio = ({ label, value, selectedValue, onSelect }) => (
  <Pressable onPress={() => onSelect(value)} style={styles.radioOptionContainer}>
    <View style={[styles.radioCircle, value === selectedValue && styles.radioCircleSelected]}>
      {value === selectedValue && <View style={styles.radioInnerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </Pressable>
);

export default function ConfirmationPage({ navigation }) {
  const { clearCart } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', phone: '', addresses: [] });
  const [orderData, setOrderData] = useState({
    name: '', phone: '', address: '', deliveryTime: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [useExistingAddress, setUseExistingAddress] = useState(true);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  // Refs for focusing inputs
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const deliveryTimeInputRef = useRef(null);
  const inputRefs = { name: nameInputRef, phone: phoneInputRef, address: addressInputRef, deliveryTime: deliveryTimeInputRef };

  // State for focused inputs to apply focused styles
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userIsLoggedInStored = await AsyncStorage.getItem('isUserLoggedIn');
        const userIsExplicitlyLoggedIn = userIsLoggedInStored === 'true';
        setIsLoggedIn(userIsExplicitlyLoggedIn);

        if (userIsExplicitlyLoggedIn) {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setProfileData(parsedData);
            const hasAddresses = parsedData.addresses && parsedData.addresses.length > 0;
            setUseExistingAddress(hasAddresses);
            setOrderData(prev => ({
              ...prev,
              name: parsedData.name || '',
              phone: parsedData.phone || '',
              address: hasAddresses ? parsedData.addresses[0] : '',
            }));
          } else { // Data inconsistency, treat as logged out for this form
            setIsLoggedIn(false);
            await AsyncStorage.setItem('isUserLoggedIn', 'false'); // Correct storage
            setProfileData({ name: '', phone: '', addresses: [] });
            setOrderData({ name: '', phone: '', address: '', deliveryTime: '' });
            setUseExistingAddress(false);
          }
        } else {
          setProfileData({ name: '', phone: '', addresses: [] });
          setOrderData(prev => ({ name: '', phone: '', address: '', deliveryTime: prev.deliveryTime }));
          setUseExistingAddress(false);
        }
      } catch (error) {
        console.error("Failed to load data from storage", error);
        // Handle error state appropriately
      }
    };
    loadData();
  }, []);

  const validateField = (name, value) => {
    // Validation logic (can be kept mostly the same as web, ensure regex is valid for JS)
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = "Ім'я є обов'язковим полем.";
        else if (value.trim().length < 2) error = "Ім'я має містити щонайменше 2 символи.";
        else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-\s]+$/.test(value)) error = "Ім'я може містити лише літери, пробіли, дефіс та апостроф.";
        break;
      case 'phone':
        const cleanedPhone = value.replace(/[^\d+]/g, '');
        if (!cleanedPhone) error = "Телефон є обов'язковим полем.";
        else if (!/^(?:\+380\d{9}|0\d{9})$/.test(cleanedPhone)) {
          error = 'Введіть дійсний український номер (+380ХХХХХХХХХ або 0ХХХХХХХХХ).';
        }
        break;
      case 'address':
        if (!value.trim()) error = "Адреса є обов'язковим полем.";
        else if (value.trim().length < 5) error = "Адреса має містити щонайменше 5 символів.";
        break;
      case 'deliveryTime': // Simple validation for time, a proper time picker is better.
        if (!value.trim()) error = "Час доставки є обов'язковим полем.";
        // Example: Add HH:MM format validation if desired
        // else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) error = "Введіть час у форматі ГГ:ХХ";
        break;
      default: break;
    }
    return error;
  };

  const handleChange = (name, value) => {
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name) => {
    setFocusedInput(null); // Clear focused state
    const error = validateField(name, orderData[name]);
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleFocus = (name) => {
    setFocusedInput(name);
  };

  const handleOrderSubmit = () => {
    const currentErrors = {};
    let formIsValid = true;

    Object.keys(orderData).forEach(key => {
      const error = validateField(key, orderData[key]);
      if (error) {
        currentErrors[key] = error;
        formIsValid = false;
      }
    });
    setFormErrors(currentErrors);

    if (!formIsValid) {
      const firstErrorFieldKey = Object.keys(currentErrors).find(key => currentErrors[key]);
      if (firstErrorFieldKey && inputRefs[firstErrorFieldKey] && inputRefs[firstErrorFieldKey].current) {
        inputRefs[firstErrorFieldKey].current.focus();
      }
      return;
    }

    console.log('Дані замовлення:', orderData);
    clearCart();
    setIsOrderConfirmed(true);
  };


  if (isOrderConfirmed) {
    return (
      <Layout currentRouteName="Confirmation">
        <View style={[styles.pageContainer, styles.orderConfirmedContainer]}>
          <Text style={styles.title}>Замовлення успішно оформлено!</Text>
          <Text style={styles.confirmationMessage}>
            Дякуємо за ваше замовлення. Ми зв’яжемося з вами найближчим часом для уточнення деталей.
          </Text>
          <View style={styles.backLinkContainer}>
            <Pressable
              onPress={() => navigation.navigate('Menu')}
              style={({ pressed }) => [styles.backLinkPressable, pressed && styles.backLinkPressablePressed]}
            >
             {({pressed}) =>  <Text style={[styles.backLinkText, pressed && styles.backLinkTextPressed]}>← Повернутись до меню</Text>}
            </Pressable>
          </View>
        </View>
      </Layout>
    );
  }

  const getInputStyle = (fieldName) => [
    styles.input,
    formErrors[fieldName] ? styles.inputError : null,
    focusedInput === fieldName ? (formErrors[fieldName] ? styles.inputErrorFocused : styles.inputFocused) : null,
  ];
  const getPickerContainerStyle = (fieldName) => [
    styles.pickerContainer,
    formErrors[fieldName] ? styles.pickerError : null,
    // focusedInput === fieldName ? (formErrors[fieldName] ? styles.pickerErrorFocused : styles.inputFocused) : null, // Focus styling for Picker container if needed
  ];


  return (
    <Layout currentRouteName="Confirmation">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.pageContainer}>
          <Text style={styles.title}>Оформлення замовлення</Text>
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Ім'я:</Text>
              <TextInput
                ref={nameInputRef}
                style={getInputStyle('name')}
                value={orderData.name}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => handleBlur('name')}
                onFocus={() => handleFocus('name')}
                placeholder="Ваше ім'я"
                placeholderTextColor={theme.colors.textSecondary}
                accessibilityLabel="Ім'я"
                accessibilityInvalid={!!formErrors.name}
              />
              {formErrors.name && <Text style={styles.errorMessage} accessibilityLiveRegion="polite">{formErrors.name}</Text>}
            </View>

            {/* Phone Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Телефон:</Text>
              <TextInput
                ref={phoneInputRef}
                style={getInputStyle('phone')}
                value={orderData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                onBlur={() => handleBlur('phone')}
                onFocus={() => handleFocus('phone')}
                placeholder="+380 XX XXX XX XX"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                accessibilityLabel="Телефон"
                accessibilityInvalid={!!formErrors.phone}
              />
              {formErrors.phone && <Text style={styles.errorMessage} accessibilityLiveRegion="polite">{formErrors.phone}</Text>}
            </View>

            {/* Address Input/Select */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Адреса доставки:</Text>
              {isLoggedIn && profileData.addresses && profileData.addresses.length > 0 ? (
                <>
                  <View style={styles.radioGroup}>
                    <CustomRadio
                      label="Вибрати збережену адресу"
                      value={true}
                      selectedValue={useExistingAddress}
                      onSelect={() => {
                        setUseExistingAddress(true);
                        if (profileData.addresses && profileData.addresses.length > 0) {
                          handleChange('address', profileData.addresses[0]);
                        }
                      }}
                    />
                    <CustomRadio
                      label="Ввести нову адресу"
                      value={false}
                      selectedValue={useExistingAddress}
                      onSelect={() => {
                        setUseExistingAddress(false);
                        handleChange('address', ''); // Clear address when switching to new
                      }}
                    />
                  </View>

                  {useExistingAddress ? (
                    <View style={getPickerContainerStyle('address')}>
                      <Picker
                        selectedValue={orderData.address}
                        onValueChange={(itemValue) => handleChange('address', itemValue)}
                        style={styles.pickerStyle}
                        prompt="Виберіть адресу"
                        // onBlur and onFocus are not standard props for Picker directly
                      >
                        {profileData.addresses.map((addr, index) => (
                          <Picker.Item key={index} label={addr} value={addr} />
                        ))}
                      </Picker>
                    </View>
                  ) : (
                    <TextInput
                      ref={addressInputRef}
                      style={getInputStyle('address')}
                      value={orderData.address}
                      onChangeText={(text) => handleChange('address', text)}
                      onBlur={() => handleBlur('address')}
                      onFocus={() => handleFocus('address')}
                      placeholder="Введіть нову адресу"
                      placeholderTextColor={theme.colors.textSecondary}
                      accessibilityLabel="Нова адреса доставки"
                      accessibilityInvalid={!!formErrors.address}
                    />
                  )}
                </>
              ) : (
                <TextInput
                  ref={addressInputRef}
                  style={getInputStyle('address')}
                  value={orderData.address}
                  onChangeText={(text) => handleChange('address', text)}
                  onBlur={() => handleBlur('address')}
                  onFocus={() => handleFocus('address')}
                  placeholder="Введіть адресу доставки"
                  placeholderTextColor={theme.colors.textSecondary}
                  accessibilityLabel="Адреса доставки"
                  accessibilityInvalid={!!formErrors.address}
                />
              )}
              {formErrors.address && <Text style={styles.errorMessage} accessibilityLiveRegion="polite">{formErrors.address}</Text>}
            </View>

            {/* Delivery Time Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Бажаний час доставки:</Text>
              <TextInput // NOTE: For better UX, use a dedicated Time Picker component
                ref={deliveryTimeInputRef}
                style={getInputStyle('deliveryTime')}
                value={orderData.deliveryTime}
                onChangeText={(text) => handleChange('deliveryTime', text)}
                onBlur={() => handleBlur('deliveryTime')}
                onFocus={() => handleFocus('deliveryTime')}
                placeholder="Наприклад, 14:30 або 'якнайшвидше'"
                placeholderTextColor={theme.colors.textSecondary}
                accessibilityLabel="Бажаний час доставки"
                accessibilityInvalid={!!formErrors.deliveryTime}
              />
              {formErrors.deliveryTime && <Text style={styles.errorMessage} accessibilityLiveRegion="polite">{formErrors.deliveryTime}</Text>}
            </View>

            <Pressable
              onPress={handleOrderSubmit}
              style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
              accessibilityRole="button"
            >
              <Text style={styles.submitButtonText}>Підтвердити замовлення</Text>
            </Pressable>
          </View>

          <View style={styles.backLinkContainer}>
            <Pressable
              onPress={() => navigation.navigate('Cart')}
              style={({ pressed }) => [styles.backLinkPressable, pressed && styles.backLinkPressablePressed]}
              accessibilityRole="link"
            >
             {({pressed}) =>  <Text style={[styles.backLinkText, pressed && styles.backLinkTextPressed]}>← Повернутись до кошика</Text>}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
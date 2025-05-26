// src/pages/ConfirmationPage.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Layout from '../components/layout/Layout';
import styles from '../styles/ConfirmationPageStyles';
import { useCart } from '../context/CartContext';

// Custom radio-button
const CustomRadio = ({ label, value, selectedValue, onSelect }) => (
  <Pressable onPress={() => onSelect(value)} style={styles.radioOption}>
    <View
      style={[
        styles.radioCircle,
        value === selectedValue && styles.radioCircleSelected,
      ]}
    >
      {value === selectedValue && <View style={styles.radioInnerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </Pressable>
);

export default function ConfirmationPage({ navigation }) {
  const { clearCart } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    addresses: [],
  });
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [useExistingAddress, setUseExistingAddress] = useState(true);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const timeRef = useRef();
  const inputRefs = { name: nameRef, phone: phoneRef, address: addressRef, deliveryTime: timeRef };

  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const logged = (await AsyncStorage.getItem('isUserLoggedIn')) === 'true';
        setIsLoggedIn(logged);

        if (logged) {
          const stored = await AsyncStorage.getItem('userData');
          if (stored) {
            const parsed = JSON.parse(stored);
            setProfileData(parsed);
            const hasAddr = parsed.addresses?.length > 0;
            setUseExistingAddress(hasAddr);
            setOrderData({
              name: parsed.name || '',
              phone: parsed.phone || '',
              address: hasAddr ? parsed.addresses[0] : '',
              deliveryTime: '',
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const validateField = (field, value) => {
    let err = '';
    if (field === 'name') {
      if (!value.trim()) err = "Ім'я обов'язкове.";
      else if (value.trim().length < 2) err = 'Мінімум 2 символи.';
    }
    if (field === 'phone') {
      const clean = value.replace(/[^\d+]/g, '');
      if (!clean) err = 'Телефон обов\'язковий.';
      else if (!/^(?:\+380\d{9}|0\d{9})$/.test(clean))
        err = 'Невірний формат (+380XXXXXXXXX або 0XXXXXXXXX).';
    }
    if (field === 'address') {
      if (!value.trim()) err = 'Адреса обов\'язкова.';
      else if (value.trim().length < 5) err = 'Мінімум 5 символів.';
    }
    if (field === 'deliveryTime' && !value.trim()) {
      err = 'Час доставки обов\'язковий.';
    }
    return err;
  };

  const handleChange = (field, val) => {
    setFormErrors(f => ({ ...f, [field]: '' }));
    setOrderData(d => ({ ...d, [field]: val }));
  };

  const handleBlur = (field) => {
    setFocusedInput(null);
    const error = validateField(field, orderData[field]);
    setFormErrors(f => ({ ...f, [field]: error }));
  };

  const handleFocus = (field) => {
    setFocusedInput(field);
  };

  const handleSubmit = () => {
    const errs = {};
    let valid = true;
    Object.keys(orderData).forEach(key => {
      const e = validateField(key, orderData[key]);
      if (e) {
        errs[key] = e;
        valid = false;
      }
    });
    setFormErrors(errs);
    if (!valid) {
      const first = Object.keys(errs).find(k => errs[k]);
      inputRefs[first]?.current?.focus();
      return;
    }
    clearCart();
    setIsOrderConfirmed(true);
  };

  if (isOrderConfirmed) {
    return (
      <Layout currentRouteName="Confirmation">
        <View style={styles.confirmedContainer}>
          <Text style={styles.title}>Замовлення оформлено!</Text>
          <Text style={styles.message}>
            Дякуємо! Ми зв’яжемося з вами найближчим часом.
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Menu')}
            style={styles.backLink}
          >
            <Text style={styles.backLinkText}>← Повернутись до меню</Text>
          </Pressable>
        </View>
      </Layout>
    );
  }

  const inputStyle = (field) => [
    styles.input,
    formErrors[field] && styles.inputError,
    focusedInput === field && styles.inputFocused,
  ];

  return (
    <Layout currentRouteName="Confirmation">
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Оформлення замовлення</Text>

        {/* Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ім'я</Text>
          <TextInput
            ref={nameRef}
            style={inputStyle('name')}
            value={orderData.name}
            onChangeText={t => handleChange('name', t)}
            onBlur={() => handleBlur('name')}
            onFocus={() => handleFocus('name')}
            placeholder="Ваше ім'я"
          />
          {formErrors.name && <Text style={styles.error}>{formErrors.name}</Text>}
        </View>

        {/* Phone */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Телефон</Text>
          <TextInput
            ref={phoneRef}
            style={inputStyle('phone')}
            value={orderData.phone}
            onChangeText={t => handleChange('phone', t)}
            onBlur={() => handleBlur('phone')}
            onFocus={() => handleFocus('phone')}
            placeholder="+380XXXXXXXXX"
            keyboardType="phone-pad"
          />
          {formErrors.phone && <Text style={styles.error}>{formErrors.phone}</Text>}
        </View>

        {/* Address */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Адреса доставки</Text>
          {isLoggedIn && profileData.addresses?.length > 0 ? (
            <>
              <View style={styles.radioGroup}>
                <CustomRadio
                  label="Використати збережену"
                  value={true}
                  selectedValue={useExistingAddress}
                  onSelect={() => {
                    setUseExistingAddress(true);
                    handleChange('address', profileData.addresses[0]);
                  }}
                />
                <CustomRadio
                  label="Ввести нову"
                  value={false}
                  selectedValue={useExistingAddress}
                  onSelect={() => {
                    setUseExistingAddress(false);
                    handleChange('address', '');
                  }}
                />
              </View>
              {useExistingAddress ? (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={orderData.address}
                    onValueChange={v => handleChange('address', v)}
                  >
                    {profileData.addresses.map((a,i) => (
                      <Picker.Item key={i} label={a} value={a} />
                    ))}
                  </Picker>
                </View>
              ) : (
                <TextInput
                  ref={addressRef}
                  style={inputStyle('address')}
                  value={orderData.address}
                  onChangeText={t => handleChange('address', t)}
                  onBlur={() => handleBlur('address')}
                  onFocus={() => handleFocus('address')}
                  placeholder="Нова адреса"
                />
              )}
            </>
          ) : (
            <TextInput
              ref={addressRef}
              style={inputStyle('address')}
              value={orderData.address}
              onChangeText={t => handleChange('address', t)}
              onBlur={() => handleBlur('address')}
              onFocus={() => handleFocus('address')}
              placeholder="Адреса доставки"
            />
          )}
          {formErrors.address && <Text style={styles.error}>{formErrors.address}</Text>}
        </View>

        {/* Delivery Time */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Час доставки</Text>
          <TextInput
            ref={timeRef}
            style={inputStyle('deliveryTime')}
            value={orderData.deliveryTime}
            onChangeText={t => handleChange('deliveryTime', t)}
            onBlur={() => handleBlur('deliveryTime')}
            onFocus={() => handleFocus('deliveryTime')}
            placeholder="ГГ:ХХ або якнайшвидше"
          />
          {formErrors.deliveryTime && (
            <Text style={styles.error}>{formErrors.deliveryTime}</Text>
          )}
        </View>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submitBtn,
            pressed && styles.submitBtnPressed,
          ]}
        >
          <Text style={styles.submitText}>Підтвердити замовлення</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>← Повернутись до кошика</Text>
        </Pressable>
      </ScrollView>
    </Layout>
  );
});
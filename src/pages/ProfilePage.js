// src/pages/ProfilePage.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'js-sha256'; // For password hashing
import Layout from '../components/layout/Layout';      // Adjust path
import { styles } from '../styles/ProfilePageStyles';         // Adjust path
import theme from '../styles/theme';                    // For placeholderTextColor

// Re-define hashing function here or import from a utility
async function hashPasswordValue(password) {
  if (!password || typeof password !== 'string' || password.trim() === '') return null;
  return sha256(password.trim());
}

export default function ProfilePage({ navigation }) {
  const [isLoading, setIsLoading] = useState(true); // For async data loading
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '', phone: '', email: '', password: '', addresses: [], hashedPassword: ''
  });
  const [newAddress, setNewAddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Default to login form if not logged in
  const [loginCredentials, setLoginCredentials] = useState({ phone: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });

  // Refs for focusing inputs
  const inputRefs = {
    regName: useRef(null), regPhone: useRef(null), regEmail: useRef(null), regPassword: useRef(null),
    loginPhone: useRef(null), loginPassword: useRef(null),
    profileName: useRef(null), profilePhone: useRef(null), profileEmail: useRef(null), profilePassword: useRef(null),
    newAddress: useRef(null),
  };
  const [focusedInput, setFocusedInput] = useState(null); // For focus styling

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const loggedInStatus = await AsyncStorage.getItem('isUserLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
        if (loggedInStatus) {
          const storedUserDataJSON = await AsyncStorage.getItem('userData');
          if (storedUserDataJSON) {
            const parsedData = JSON.parse(storedUserDataJSON);
            setUserData(prev => ({ ...prev, ...parsedData, password: '' })); // Clear password field
          } else { // Data missing, log out
            await AsyncStorage.setItem('isUserLoggedIn', 'false');
            setIsLoggedIn(false);
          }
          setShowLogin(false); // If logged in, don't show login form initially
        } else {
          setShowLogin(true); // If not logged in, show login form
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        setAuthMessage({ type: 'error', text: 'Помилка завантаження даних.'});
      }
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  const persistUserData = async (currentData) => {
    let dataToStore = { ...currentData };
    if (currentData.password && currentData.password.trim() !== '') {
      const hashedPassword = await hashPasswordValue(currentData.password.trim());
      dataToStore.hashedPassword = hashedPassword;
    }
    delete dataToStore.password;
    setUserData(prev => ({ ...prev, ...dataToStore, password: '' }));
    await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
  };

  const validateField = (name, value, currentPassword = '') => {
    let error = '';
    // ... (validation logic from your web version can be largely reused here) ...
    // Example for name:
    if (name === 'name') {
        if (!value.trim()) error = "Ім'я є обов'язковим.";
        else if (value.trim().length < 2) error = "Ім'я має містити принаймні 2 символи.";
        else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-\s]+$/.test(value)) error = "Некоректні символи в імені.";
    } else if (name === 'phone') {
        const cleanedPhone = value.replace(/[^\d+]/g, '');
        if (!cleanedPhone) error = "Телефон є обов'язковим.";
        else if (!/^(?:\+380\d{9}|0\d{9})$/.test(cleanedPhone)) error = 'Некоректний формат телефону.';
    } else if (name === 'email') {
        if (value.trim() && !/\S+@\S+\.\S+/.test(value.trim())) error = "Некоректний формат email.";
    } else if (name === 'password') {
        if (!value.trim()) error = "Пароль є обов'язковим.";
        else if (value.trim().length < 4) error = "Пароль має містити принаймні 4 символи.";
    } else if (name === 'newAddress') {
        if (!value.trim()) error = "Адреса не може бути порожньою.";
        else if (value.trim().length < 5) error = "Адреса має бути довшою.";
    }
    return error;
  };

  const createChangeHandler = (setter, formPrefix = '', fieldName) => (text) => {
    setter(prev => ({ ...prev, [fieldName]: text }));
    const errorKey = formPrefix ? `${formPrefix}.${fieldName}` : fieldName;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
    setAuthMessage({ type: '', text: '' });
  };

  const createBlurHandler = (dataSource, formPrefix = '', fieldName) => () => {
    setFocusedInput(null);
    const error = validateField(fieldName, dataSource[fieldName], dataSource.password);
    const errorKey = formPrefix ? `${formPrefix}.${fieldName}` : fieldName;
    setFormErrors(prev => ({ ...prev, [errorKey]: error }));
  };

  // Specific handlers
  const handleChangeUserData = (fieldName) => createChangeHandler(setUserData, 'userData', fieldName);
  const handleBlurUserData = (fieldName) => createBlurHandler(userData, 'userData', fieldName);
  const handleChangeLogin = (fieldName) => createChangeHandler(setLoginCredentials, 'login', fieldName);
  const handleBlurLogin = (fieldName) => createBlurHandler(loginCredentials, 'login', fieldName);

  const handleChangeNewAddress = (text) => {
    setNewAddress(text);
    if (formErrors.newAddress) setFormErrors(prev => ({...prev, newAddress: ''}));
  };
  const handleBlurNewAddress = () => {
    handleBlur('newAddressInput'); // To remove focus style
    setFormErrors(prev => ({...prev, newAddress: validateField('newAddress', newAddress)}));
  };

  const runValidation = (fields, data, prefix = '') => {
    const errors = {};
    let isValid = true;
    fields.forEach(field => {
      const error = validateField(field, data[field] || '', data.password);
      if (error) {
        errors[prefix ? `${prefix}.${field}` : field] = error;
        isValid = false;
      }
    });
    setFormErrors(prev => ({ ...prev, ...errors }));
    return isValid;
  };

  const handleRegister = async () => {
    setAuthMessage({ type: '', text: '' });
    const fields = ['name', 'phone', 'password'];
    if (userData.email && userData.email.trim()) fields.push('email');

    if (!runValidation(fields, userData, 'userData')) return;

    try {
        setIsLoading(true);
        await persistUserData(userData);
        await AsyncStorage.setItem('isUserLoggedIn', 'true');
        setIsLoggedIn(true);
        setShowLogin(false);
        setAuthMessage({ type: 'success', text: 'Реєстрація успішна! Вас автоматично авторизовано.' });
    } catch (error) {
        console.error("Registration error:", error);
        setAuthMessage({ type: 'error', text: 'Помилка реєстрації.' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthMessage({ type: '', text: '' });
    if (!runValidation(['phone', 'password'], loginCredentials, 'login')) return;

    setIsLoading(true);
    try {
        const storedUserDataJSON = await AsyncStorage.getItem('userData');
        if (storedUserDataJSON) {
            const parsedStoredData = JSON.parse(storedUserDataJSON);
            if (!parsedStoredData.hashedPassword) {
                setAuthMessage({ type: 'error', text: 'Помилка даних. Будь ласка, зареєструйтесь знову.' });
                setIsLoading(false);
                return;
            }
            const hashedPasswordAttempt = await hashPasswordValue(loginCredentials.password.trim());
            if (parsedStoredData.phone === loginCredentials.phone.trim() && parsedStoredData.hashedPassword === hashedPasswordAttempt) {
                setUserData({ ...parsedStoredData, password: '' });
                await AsyncStorage.setItem('isUserLoggedIn', 'true');
                setIsLoggedIn(true);
                setShowLogin(false);
                setLoginCredentials({ phone: '', password: '' });
                setFormErrors({});
                // Optionally, success message for login: setAuthMessage({ type: 'success', text: 'Вхід успішний!' });
            } else {
                setAuthMessage({ type: 'error', text: 'Неправильний телефон або пароль.' });
            }
        } else {
            setAuthMessage({ type: 'error', text: 'Користувача не знайдено. Будь ласка, зареєструйтесь.' });
        }
    } catch (error) {
        console.error("Login error:", error);
        setAuthMessage({ type: 'error', text: 'Помилка входу.' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleProfileSave = async () => {
    setAuthMessage({ type: '', text: '' });
    const fieldsToValidate = ['name', 'phone'];
    if (userData.email && userData.email.trim()) fieldsToValidate.push('email');
    if (userData.password && userData.password.trim()) fieldsToValidate.push('password');

    if (!runValidation(fieldsToValidate, userData, 'userData')) return;

    setIsLoading(true);
    try {
        await persistUserData(userData);
        setIsEditing(false);
        setAuthMessage({ type: 'success', text: 'Профіль успішно оновлено.' });
    } catch (error) {
        console.error("Profile save error:", error);
        setAuthMessage({ type: 'error', text: 'Помилка збереження профілю.' });
    } finally {
        setIsLoading(false);
    }
  };

  const toggleEditAndSave = () => {
    setAuthMessage({ type: '', text: '' });
    if (isEditing) {
      handleProfileSave();
    } else {
      setUserData(prev => ({ ...prev, password: '' })); // Clear password field when entering edit mode
      setIsEditing(true);
    }
  };

  const saveAddress = async () => {
    setAuthMessage({ type: '', text: '' });
    if (!runValidation(['newAddress'], { newAddress })) return;

    setIsLoading(true);
    try {
        const updatedAddresses = [...(userData.addresses || []), newAddress.trim()];
        // Persist the whole userData object including the new addresses array
        await persistUserData({ ...userData, addresses: updatedAddresses });
        setNewAddress('');
        setFormErrors(prev => ({ ...prev, newAddress: '' })); // Clear specific error
        setAuthMessage({ type: 'success', text: 'Адресу додано.' });
    } catch (error) {
        console.error("Save address error:", error);
        setAuthMessage({ type: 'error', text: 'Помилка додавання адреси.' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
        await AsyncStorage.setItem('isUserLoggedIn', 'false');
        // Optionally clear userData from AsyncStorage too, or keep it for next login hint
        // await AsyncStorage.removeItem('userData');
        setIsLoggedIn(false);
        setShowLogin(true);
        setUserData({ name: '', phone: '', email: '', password: '', addresses: [], hashedPassword: '' });
        setLoginCredentials({ phone: '', password: '' });
        setFormErrors({});
        setAuthMessage({ type: '', text: '' });
    } catch (error) {
        console.error("Logout error:", error);
        setAuthMessage({ type: 'error', text: 'Помилка виходу.' });
    } finally {
        setIsLoading(false);
    }
  };

  const renderAuthMessage = () => {
    if (!authMessage.text) return null;
    const messageContainerStyle = authMessage.type === 'success'
      ? [styles.authMessageContainer, styles.authMessageSuccess]
      : [styles.authMessageContainer, styles.authMessageError];
    const messageTextStyle = authMessage.type === 'success'
      ? [styles.authMessageText, styles.authMessageTextSuccess]
      : [styles.authMessageText, styles.authMessageTextError];

    return (
      <View style={messageContainerStyle} accessibilityRole="alert">
        <Text style={messageTextStyle}>{authMessage.text}</Text>
      </View>
    );
  };

  const getInputStyle = (fieldName, prefix = '') => {
    const errorKey = prefix ? `${prefix}.${fieldName}` : fieldName;
    const baseFocusedInputName = prefix ? `${prefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}` : fieldName;

    return [
      styles.input,
      formErrors[errorKey] ? styles.inputError : null,
      focusedInput === baseFocusedInputName ? (formErrors[errorKey] ? styles.inputErrorFocused : styles.inputFocused) : null,
    ];
  };

  const renderTextInput = (fieldConfig) => {
    const { label, fieldName, placeholder, keyboardType = 'default', secureTextEntry = false, state, handler, blurHandler, errorPrefix = '', refKey, isRequired = false } = fieldConfig;
    const errorKey = errorPrefix ? `${errorPrefix}.${fieldName}` : fieldName;
    const baseFocusedInputName = errorPrefix ? `${errorPrefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}` : fieldName;

    return (
      <View style={styles.formGroup}>
        <Text style={styles.label}>{label}{isRequired ? '*' : ''}</Text>
        <TextInput
          ref={inputRefs[refKey]}
          style={getInputStyle(fieldName, errorPrefix)}
          value={state[fieldName]}
          onChangeText={handler(fieldName)}
          onBlur={blurHandler(fieldName)}
          onFocus={() => setFocusedInput(baseFocusedInputName)}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          accessibilityLabel={label}
          accessibilityInvalid={!!formErrors[errorKey]}
        />
        {formErrors[errorKey] && <Text style={styles.errorMessage} accessibilityLiveRegion="polite">{formErrors[errorKey]}</Text>}
      </View>
    );
  };


  const renderRegistrationForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Створити обліковий запис</Text>
      {renderAuthMessage()}
      {renderTextInput({ label: "Ім'я", fieldName: "name", placeholder: "Ваше ім'я", state: userData, handler: handleChangeUserData, blurHandler: handleBlurUserData, errorPrefix: 'userData', refKey: 'regName', isRequired: true })}
      {renderTextInput({ label: "Телефон", fieldName: "phone", placeholder: "+380XXXYYYZZZ", keyboardType: "phone-pad", state: userData, handler: handleChangeUserData, blurHandler: handleBlurUserData, errorPrefix: 'userData', refKey: 'regPhone', isRequired: true })}
      {renderTextInput({ label: "Email (не обов'язково)", fieldName: "email", placeholder: "example@mail.com", keyboardType: "email-address", state: userData, handler: handleChangeUserData, blurHandler: handleBlurUserData, errorPrefix: 'userData', refKey: 'regEmail' })}
      {renderTextInput({ label: "Пароль", fieldName: "password", placeholder: "Мін. 4 символи", secureTextEntry: true, state: userData, handler: handleChangeUserData, blurHandler: handleBlurUserData, errorPrefix: 'userData', refKey: 'regPassword', isRequired: true })}

      <Pressable onPress={handleRegister} style={({pressed}) => [styles.buttonBase, styles.buttonPrimary, styles.formSectionButton, pressed && styles.buttonPrimaryPressed]} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color={theme.colors.textOnAccentSoft} /> : <Text style={[styles.buttonTextBase, styles.buttonTextPrimary, styles.formSectionButtonText]}>Зареєструватися</Text>}
      </Pressable>
      <Text style={styles.formToggleText}>
        Вже маєте акаунт?{' '}
        <Pressable onPress={() => { setShowLogin(true); setFormErrors({}); setAuthMessage({type:'', text:''}); }}>
          {({pressed}) => <Text style={[styles.formLinkButtonText, pressed && styles.formLinkButtonTextPressed]}>Увійти</Text>}
        </Pressable>
      </Text>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Увійти</Text>
      {renderAuthMessage()}
      {renderTextInput({ label: "Телефон", fieldName: "phone", placeholder: "+380XXXYYYZZZ", keyboardType: "phone-pad", state: loginCredentials, handler: handleChangeLogin, blurHandler: handleBlurLogin, errorPrefix: 'login', refKey: 'loginPhone', isRequired: true })}
      {renderTextInput({ label: "Пароль", fieldName: "password", placeholder: "Ваш пароль", secureTextEntry: true, state: loginCredentials, handler: handleChangeLogin, blurHandler: handleBlurLogin, errorPrefix: 'login', refKey: 'loginPassword', isRequired: true })}

      <Pressable onPress={handleLogin} style={({pressed}) => [styles.buttonBase, styles.buttonPrimary, styles.formSectionButton, pressed && styles.buttonPrimaryPressed]} disabled={isLoading}>
         {isLoading ? <ActivityIndicator color={theme.colors.textOnAccentSoft} /> : <Text style={[styles.buttonTextBase, styles.buttonTextPrimary, styles.formSectionButtonText]}>Увійти</Text>}
      </Pressable>
      <Text style={styles.formToggleText}>
        Немає акаунту?{' '}
        <Pressable onPress={() => { setShowLogin(false); setFormErrors({}); setAuthMessage({type:'', text:''}); }}>
           {({pressed}) => <Text style={[styles.formLinkButtonText, pressed && styles.formLinkButtonTextPressed]}>Зареєструватися</Text>}
        </Pressable>
      </Text>
    </View>
  );

  const renderProfileForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.profilePageTitle}>Профіль користувача</Text>
      {renderAuthMessage()}
      <View style={styles.profileInfoGroup}>
        {/* Name */}
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoLabel}>Ім’я:</Text>
          {isEditing ? (
            <TextInput ref={inputRefs.profileName} style={[styles.input, styles.inputInline, getInputStyle('name', 'userData')]} value={userData.name} onChangeText={handleChangeUserData('name')} onBlur={handleBlurUserData('name')} onFocus={() => setFocusedInput('userDataName')} />
          ) : ( <Text style={styles.profileInfoValue}>{userData.name}</Text> )}
        </View>
        {isEditing && formErrors['userData.name'] && <Text style={[styles.errorMessage, styles.errorMessageInline]}>{formErrors['userData.name']}</Text>}

        {/* Phone */}
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoLabel}>Телефон:</Text>
          {isEditing ? (
            <TextInput ref={inputRefs.profilePhone} style={[styles.input, styles.inputInline, getInputStyle('phone', 'userData')]} value={userData.phone} onChangeText={handleChangeUserData('phone')} onBlur={handleBlurUserData('phone')} onFocus={() => setFocusedInput('userDataPhone')} keyboardType="phone-pad"/>
          ) : ( <Text style={styles.profileInfoValue}>{userData.phone}</Text> )}
        </View>
         {isEditing && formErrors['userData.phone'] && <Text style={[styles.errorMessage, styles.errorMessageInline]}>{formErrors['userData.phone']}</Text>}

        {/* Email */}
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoLabel}>Email:</Text>
          {isEditing ? (
            <TextInput ref={inputRefs.profileEmail} style={[styles.input, styles.inputInline, getInputStyle('email', 'userData')]} value={userData.email} onChangeText={handleChangeUserData('email')} onBlur={handleBlurUserData('email')} onFocus={() => setFocusedInput('userDataEmail')} keyboardType="email-address"/>
          ) : ( <Text style={styles.profileInfoValue}>{userData.email || 'Не вказано'}</Text> )}
        </View>
        {isEditing && formErrors['userData.email'] && <Text style={[styles.errorMessage, styles.errorMessageInline]}>{formErrors['userData.email']}</Text>}

        {/* New Password (only in edit mode) */}
        {isEditing && (
          <>
            <View style={styles.profileInfoItem}>
              <Text style={styles.profileInfoLabel}>Новий пароль:</Text>
              <TextInput ref={inputRefs.profilePassword} style={[styles.input, styles.inputInline, getInputStyle('password', 'userData')]} value={userData.password} onChangeText={handleChangeUserData('password')} onBlur={handleBlurUserData('password')} onFocus={() => setFocusedInput('userDataPassword')} placeholder="Залиште порожнім, щоб не змінювати" secureTextEntry />
            </View>
            {formErrors['userData.password'] && <Text style={[styles.errorMessage, styles.errorMessageInline]}>{formErrors['userData.password']}</Text>}
          </>
        )}
      </View>

      <View style={styles.profileActionsContainer}>
        <Pressable onPress={toggleEditAndSave} style={({pressed}) => [styles.buttonBase, styles.buttonPrimary, styles.profileActionButton, pressed && styles.buttonPrimaryPressed]} disabled={isLoading}>
          {isLoading && isEditing ? <ActivityIndicator color={theme.colors.textOnAccentSoft}/> : <Text style={[styles.buttonTextBase, styles.buttonTextPrimary]}>{isEditing ? 'Зберегти зміни' : 'Редагувати профіль'}</Text>}
        </Pressable>
        {isEditing && (
          <Pressable onPress={async () => { setIsEditing(false); const stored = await AsyncStorage.getItem('userData'); if (stored) setUserData(prev => ({ ...prev, ...JSON.parse(stored), password: ''})); setFormErrors({}); setAuthMessage({type:'', text:''}); }} style={({pressed}) => [styles.buttonBase, styles.buttonSecondary, styles.profileActionButton, pressed && styles.buttonSecondaryPressed]} disabled={isLoading}>
             <Text style={[styles.buttonTextBase, styles.buttonTextSecondary]}>Скасувати</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.addressesTitle}>Адреси</Text>
      <View style={styles.addressListContainer}>
        {(userData.addresses && userData.addresses.length > 0) ? (
          <View style={styles.addressListItemsContainer}>
            {userData.addresses.map((address, index) => (
              <View key={index} style={styles.addressListItem}><Text style={styles.addressListItemText}>{address}</Text></View>
            ))}
          </View>
        ) : <Text style={styles.addressListNoItemsText}>У вас ще немає збережених адрес.</Text>}
      </View>

      <View style={[styles.formGroup, styles.addAddressFormContainer]}>
        <Text style={styles.label}>Додати нову адресу:</Text>
        <TextInput ref={inputRefs.newAddress} style={getInputStyle('newAddress')} value={newAddress} onChangeText={handleChangeNewAddress} onBlur={handleBlurNewAddress} onFocus={() => setFocusedInput('newAddressInput')} placeholder="Введіть нову адресу" />
        {formErrors.newAddress && <Text style={styles.errorMessage}>{formErrors.newAddress}</Text>}
        <Pressable onPress={saveAddress} style={({pressed}) => [styles.buttonBase, styles.buttonSecondary, styles.addAddressButton, pressed && styles.buttonSecondaryPressed]} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color={theme.colors.textSecondary}/> : <Text style={[styles.buttonTextBase, styles.buttonTextSecondary]}>Додати адресу</Text>}
        </Pressable>
      </View>

      <View style={styles.separator} />
      <Pressable onPress={handleLogout} style={({pressed}) => [styles.buttonBase, styles.buttonDanger, styles.logoutButton, pressed && styles.buttonDangerPressed]} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color={theme.colors.textOnDangerSoft}/> : <Text style={[styles.buttonTextBase, styles.buttonTextDanger]}>Вийти</Text>}
      </Pressable>
    </View>
  );

  if (isLoading && !isLoggedIn && !authMessage.text) { // Initial loading state
    return (
        <Layout currentRouteName="Profile">
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
            </View>
        </Layout>
    );
  }

  return (
    <Layout currentRouteName="Profile">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.pageContainer}>
          {isLoggedIn ? renderProfileForm() : (showLogin ? renderLoginForm() : renderRegistrationForm())}
        </View>
      </ScrollView>
    </Layout>
  );
}
// src/pages/ProfilePage.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'js-sha256';
import Layout from '../components/layout/Layout';
// import { styles } from '../styles/ProfilePageStyles';
import theme from '../styles/theme';

async function hashPasswordValue(password) {
  if (!password?.trim()) return null;
  return sha256(password.trim());
}

export default function ProfilePage({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });
  const [formErrors, setFormErrors] = useState({});

  const [userData, setUserData] = useState({
    name: '', phone: '', email: '', password: '', addresses: [], hashedPassword: ''
  });
  const [loginCred, setLoginCred] = useState({ phone: '', password: '' });
  const [newAddress, setNewAddress] = useState('');

  const refs = {
    name: useRef(), phone: useRef(), email: useRef(), password: useRef(),
    loginPhone: useRef(), loginPassword: useRef(), newAddress: useRef()
  };
  const [focused, setFocused] = useState(null);

  // Load stored user/auth state
  useEffect(() => {
    (async () => {
      try {
        const logged = (await AsyncStorage.getItem('isUserLoggedIn')) === 'true';
        setIsLoggedIn(logged);
        setShowLogin(!logged);
        if (logged) {
          const stored = await AsyncStorage.getItem('userData');
          if (stored) {
            const parsed = JSON.parse(stored);
            setUserData({ ...parsed, password: '' });
          }
        }
      } catch (e) {
        console.error(e);
        setAuthMessage({ type: 'error', text: 'Помилка завантаження даних.' });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const validateField = (name, val) => {
    let err = '';
    if (name === 'name') {
      if (!val.trim()) err = "Ім'я є обов'язковим.";
      else if (val.trim().length < 2) err = 'Мінімум 2 символи.';
    }
    if (name === 'phone') {
      const clean = val.replace(/[^\d+]/g, '');
      if (!clean) err = 'Телефон обов’язковий.';
      else if (!/^(?:\+380\d{9}|0\d{9})$/.test(clean))
        err = 'Невірний формат.';
    }
    if (name === 'email' && val.trim() && !/\S+@\S+\.\S+/.test(val))
      err = 'Невірний email.';
    if (name === 'password' && isEditing && val && val.trim().length < 4)
      err = 'Мінімум 4 символи.';
    if (name === 'newAddress') {
      if (!val.trim()) err = 'Адреса не може бути порожньою.';
      else if (val.trim().length < 5) err = 'Мінімум 5 символів.';
    }
    return err;
  };

  const runValidation = (fields, data, prefix='') => {
    const errs = {};
    let ok = true;
    fields.forEach(f => {
      const e = validateField(f, data[f] || '');
      if (e) {
        errs[prefix ? `${prefix}.${f}` : f] = e;
        ok = false;
      }
    });
    setFormErrors(prev => ({ ...prev, ...errs }));
    return ok;
  };

  const handleRegister = async () => {
    setAuthMessage({});
    const fields=['name','phone','password'];
    if (userData.email.trim()) fields.push('email');
    if (!runValidation(fields, userData)) return;
    setIsLoading(true);
    try {
      const toStore = { ...userData };
      if (userData.password) {
        toStore.hashedPassword = await hashPasswordValue(userData.password);
      }
      delete toStore.password;
      await AsyncStorage.setItem('userData', JSON.stringify(toStore));
      await AsyncStorage.setItem('isUserLoggedIn','true');
      setUserData(toStore);
      setIsLoggedIn(true);
      setShowLogin(false);
      setAuthMessage({ type:'success', text:'Реєстрація успішна!' });
    } catch {
      setAuthMessage({ type:'error', text:'Помилка реєстрації.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthMessage({});
    if (!runValidation(['phone','password'], loginCred, 'login')) return;
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem('userData');
      if (stored) {
        const parsed = JSON.parse(stored);
        const attempt = await hashPasswordValue(loginCred.password);
        if (parsed.phone === loginCred.phone.trim() && parsed.hashedPassword === attempt) {
          setUserData(parsed);
          await AsyncStorage.setItem('isUserLoggedIn','true');
          setIsLoggedIn(true);
          setShowLogin(false);
          setLoginCred({ phone:'', password:'' });
          setFormErrors({});
          setAuthMessage({ type:'success', text:'Логін успішний!' });
        } else {
          setAuthMessage({ type:'error', text:'Невірні дані.' });
        }
      } else {
        setAuthMessage({ type:'error', text:'Користувача не знайдено.' });
      }
    } catch {
      setAuthMessage({ type:'error', text:'Помилка входу.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setAuthMessage({});
    const fields=['name','phone'];
    if (userData.email.trim()) fields.push('email');
    if (userData.password) fields.push('password');
    if (!runValidation(fields, userData)) return;
    setIsLoading(true);
    try {
      const toStore = { ...userData };
      if (userData.password) {
        toStore.hashedPassword = await hashPasswordValue(userData.password);
      }
      delete toStore.password;
      await AsyncStorage.setItem('userData', JSON.stringify(toStore));
      setUserData(toStore);
      setIsEditing(false);
      setAuthMessage({ type:'success', text:'Профіль оновлено.' });
    } catch {
      setAuthMessage({ type:'error', text:'Помилка збереження.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('isUserLoggedIn','false');
      setIsLoggedIn(false);
      setShowLogin(true);
      setUserData({ name:'', phone:'', email:'', password:'', addresses:[], hashedPassword:'' });
      setAuthMessage({});
      setFormErrors({});
    } catch {
      setAuthMessage({ type:'error', text:'Помилка виходу.' });
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async () => {
    if (!runValidation(['newAddress'], { newAddress })) return;
    setIsLoading(true);
    try {
      const updated = [...(userData.addresses||[]), newAddress.trim()];
      const toStore = { ...userData, addresses: updated };
      await AsyncStorage.setItem('userData', JSON.stringify(toStore));
      setUserData(toStore);
      setNewAddress('');
      setFormErrors(prev => ({ ...prev, newAddress: '' }));
      setAuthMessage({ type:'success', text:'Адресу додано.' });
    } catch {
      setAuthMessage({ type:'error', text:'Помилка додавання.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isLoggedIn && !authMessage.text) {
    return (
      <Layout currentRouteName="Profile">
        <View style={sty.loader}>
          <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
        </View>
      </Layout>
    );
  }

  const renderAuthMessage = () => {
    if (!authMessage.text) return null;
    const boxStyle = authMessage.type==='success'? sty.msgSuccess: sty.msgError;
    const txtStyle = authMessage.type==='success'? sty.msgTextSuccess: sty.msgTextError;
    return <View style={[sty.msgBox,boxStyle]}><Text style={[sty.msgText,txtStyle]}>{authMessage.text}</Text></View>;
  };

  const renderTextInput = ({ label, value, onChange, onBlur, onFocus, placeholder, secure=false, keyboardType='default', refKey, errorKey }) => (
    <View style={sty.group}>
      <Text style={sty.label}>{label}</Text>
      <TextInput
        ref={refs[refKey]}
        style={[
          sty.input,
          formErrors[errorKey] && sty.inputError,
          focused===refKey && sty.inputFocused
        ]}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        onFocus={()=>setFocused(refKey)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
      {!!formErrors[errorKey] && <Text style={sty.errorText}>{formErrors[errorKey]}</Text>}
    </View>
  );

  const renderRegistration = () => (
    <View>
      <Text style={sty.heading}>Реєстрація</Text>
      {renderAuthMessage()}
      {renderTextInput({
        label:"Ім'я*", value:userData.name, refKey:'name',
        onChange:text=>setUserData(prev=>({...prev,name:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,name:validateField('name',userData.name)})),
        onFocus:()=>setFocused('name'),
        placeholder:"Ваше ім'я", errorKey:'name'
      })}
      {renderTextInput({
        label:"Телефон*", value:userData.phone, refKey:'phone',
        onChange:text=>setUserData(prev=>({...prev,phone:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,phone:validateField('phone',userData.phone)})),
        onFocus:()=>setFocused('phone'),
        placeholder:"+380XXXXXXXXX", keyboardType:'phone-pad', errorKey:'phone'
      })}
      {renderTextInput({
        label:"Email", value:userData.email, refKey:'email',
        onChange:text=>setUserData(prev=>({...prev,email:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,email:validateField('email',userData.email)})),
        onFocus:()=>setFocused('email'),
        placeholder:"example@mail.com", keyboardType:'email-address', errorKey:'email'
      })}
      {renderTextInput({
        label:"Пароль*", value:userData.password, refKey:'password',
        onChange:text=>setUserData(prev=>({...prev,password:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,password:validateField('password',userData.password)})),
        onFocus:()=>setFocused('password'),
        placeholder:"Мін. 4 символи", secure:true, errorKey:'password'
      })}
      <Pressable style={({pressed})=>[sty.btn,sty.btnPrimary, pressed&&sty.btnPrimaryPressed]} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff"/> : <Text style={sty.btnText}>Зареєструватися</Text>}
      </Pressable>
      <Pressable onPress={()=>{ setShowLogin(true); setFormErrors({}); setAuthMessage({}); }} style={sty.linkToggle}>
        <Text style={sty.linkText}>Уже є акаунт? Увійти</Text>
      </Pressable>
    </View>
  );

  const renderLogin = () => (
    <View>
      <Text style={sty.heading}>Увійти</Text>
      {renderAuthMessage()}
      {renderTextInput({
        label:"Телефон*", value:loginCred.phone, refKey:'loginPhone',
        onChange:text=>setLoginCred(prev=>({...prev,phone:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,'login.phone':validateField('phone',loginCred.phone)})),
        onFocus:()=>setFocused('loginPhone'),
        placeholder:"+380XXXXXXXXX", keyboardType:'phone-pad', errorKey:'login.phone'
      })}
      {renderTextInput({
        label:"Пароль*", value:loginCred.password, refKey:'loginPassword',
        onChange:text=>setLoginCred(prev=>({...prev,password:text})),
        onBlur:()=>setFormErrors(prev=>({...prev,'login.password':validateField('password',loginCred.password)})),
        onFocus:()=>setFocused('loginPassword'),
        placeholder:"Ваш пароль", secure:true, errorKey:'login.password'
      })}
      <Pressable style={({pressed})=>[sty.btn,sty.btnPrimary, pressed&&sty.btnPrimaryPressed]} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff"/> : <Text style={sty.btnText}>Увійти</Text>}
      </Pressable>
      <Pressable onPress={()=>{ setShowLogin(false); setFormErrors({}); setAuthMessage({}); }} style={sty.linkToggle}>
        <Text style={sty.linkText}>Немає акаунту? Зареєструватися</Text>
      </Pressable>
    </View>
  );

const renderProfile = () => (
      <View>
        <Text style={sty.heading}>Мій профіль</Text>
        {renderAuthMessage()}

        {/* Name */}
        <View style={sty.row}>
          <Text style={sty.label}>Ім'я:</Text>
          {isEditing ? (
            <TextInput
              ref={refs.name}
              style={[
                sty.inputInline,
                formErrors['userData.name'] && sty.inputError
              ]}
              value={userData.name}
              onChangeText={t =>
                setUserData(prev => ({ ...prev, name: t }))
              }
            />
          ) : (
            <Text style={sty.value}>{userData.name}</Text>
          )}
        </View>
        {!!formErrors['userData.name'] && (
          <Text style={sty.errorInline}>
            {formErrors['userData.name']}
          </Text>
        )}

        {/* Phone */}
        <View style={sty.row}>
          <Text style={sty.label}>Телефон:</Text>
          {isEditing ? (
            <TextInput
              ref={refs.phone}
              style={[
                sty.inputInline,
                formErrors['userData.phone'] && sty.inputError
              ]}
              value={userData.phone}
              onChangeText={t =>
                setUserData(prev => ({ ...prev, phone: t }))
              }
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={sty.value}>{userData.phone}</Text>
          )}
        </View>
        {!!formErrors['userData.phone'] && (
          <Text style={sty.errorInline}>
            {formErrors['userData.phone']}
          </Text>
        )}

        {/* Email */}
        <View style={sty.row}>
          <Text style={sty.label}>Email:</Text>
          {isEditing ? (
            <TextInput
              ref={refs.email}
              style={[
                sty.inputInline,
                formErrors['userData.email'] && sty.inputError
              ]}
              value={userData.email}
              onChangeText={t =>
                setUserData(prev => ({ ...prev, email: t }))
              }
              keyboardType="email-address"
            />
          ) : (
            <Text style={sty.value}>
              {userData.email || 'Не вказано'}
            </Text>
          )}
        </View>
        {!!formErrors['userData.email'] && (
          <Text style={sty.errorInline}>
            {formErrors['userData.email']}
          </Text>
        )}

        {/* New Password */}
        {isEditing && (
          <>
            <View style={sty.row}>
              <Text style={sty.label}>Новий пароль:</Text>
              <TextInput
                ref={refs.password}
                style={[
                  sty.inputInline,
                  formErrors['userData.password'] && sty.inputError
                ]}
                value={userData.password}
                onChangeText={t =>
                  setUserData(prev => ({ ...prev, password: t }))
                }
                secureTextEntry
              />
            </View>
            {!!formErrors['userData.password'] && (
              <Text style={sty.errorInline}>
                {formErrors['userData.password']}
              </Text>
            )}
          </>
        )}

        <View style={sty.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              sty.btn,
              sty.btnPrimary,
              pressed && sty.btnPrimaryPressed
            ]}
            onPress={() => {
              if (isEditing) handleSaveProfile();
              else {
                setIsEditing(true);
                setUserData(prev => ({ ...prev, password: '' }));
              }
            }}
            disabled={isLoading}
          >
            {isLoading && isEditing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={sty.btnText}>
                {isEditing ? 'Зберегти' : 'Редагувати'}
              </Text>
            )}
          </Pressable>
          {isEditing && (
            <Pressable
              style={({ pressed }) => [
                sty.btn,
                sty.btnSecondary,
                pressed && sty.btnSecondaryPressed
              ]}
              onPress={() => {
                AsyncStorage.getItem('userData').then(st =>
                  st && setUserData({ ...JSON.parse(st), password: '' })
                );
                setIsEditing(false);
                setFormErrors({});
                setAuthMessage({});
              }}
            >
              <Text style={sty.btnText}>Скасувати</Text>
            </Pressable>
          )}
        </View>

        <Text style={sty.subheading}>Адреси</Text>
        {userData.addresses?.length > 0 ? (
          userData.addresses.map((a, i) => (
            <Text key={i} style={sty.addressItem}>
              {a}
            </Text>
          ))
        ) : (
          <Text style={sty.value}>Немає адрес.</Text>
        )}

        <View style={sty.group}>
          <Text style={sty.label}>Нова адреса:</Text>
          <TextInput
            ref={refs.newAddress}
            style={[sty.input, formErrors.newAddress && sty.inputError]}
            value={newAddress}
            onChangeText={setNewAddress}
            onBlur={() =>
              setFormErrors(prev =>
                ({ ...prev, newAddress: validateField('newAddress', newAddress) })
              )
            }
            onFocus={() => setFocused('newAddress')}
            placeholder="Введіть адресу"
          />
          {!!formErrors.newAddress && (
            <Text style={sty.errorText}>{formErrors.newAddress}</Text>
          )}
          <Pressable
            style={({ pressed }) => [
              sty.btn,
              sty.btnSecondary,
              pressed && sty.btnSecondaryPressed
            ]}
            onPress={addAddress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.textSecondary} />
            ) : (
              <Text style={sty.btnText}>Додати адресу</Text>
            )}
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            sty.btn,
            sty.btnDanger,
            pressed && sty.btnDangerPressed
          ]}
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={sty.btnText}>Вийти</Text>
          )}
        </Pressable>
      </View>
    );

  return (
    <Layout currentRouteName="Profile">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={sty.scroll}>
        {isLoggedIn ? renderProfile() : (showLogin ? renderLogin() : renderRegistration())}
      </ScrollView>
    </Layout>
  );
}

const sty = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  group: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  inputFocused: {
    borderColor: '#007aff',
  },
  inputError: {
    borderColor: '#d00',
  },
  errorText: {
    color: '#d00',
    marginTop: 4,
    fontSize: 12,
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: '#007aff',
  },
  btnPrimaryPressed: {
    backgroundColor: '#005bb5',
  },
  btnSecondary: {
    backgroundColor: '#eee',
  },
  btnSecondaryPressed: {
    backgroundColor: '#ccc',
  },
  btnDanger: {
    backgroundColor: '#d00',
  },
  btnDangerPressed: {
    backgroundColor: '#a00',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  linkToggle: {
    alignSelf: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#007aff',
  },
  msgBox: {
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
  msgSuccess: {
    backgroundColor: '#e6f4ea',
  },
  msgError: {
    backgroundColor: '#fdecea',
  },
  msgText: {
    fontSize: 14,
  },
  msgTextSuccess: {
    color: '#2e7d32',
  },
  msgTextError: {
    color: '#c62828',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    flexShrink: 1,
  },
  inputInline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  errorInline: {
    color: '#d00',
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap isn't supported—use margin on child elements instead
  },
  addressItem: {
    fontSize: 14,
    marginVertical: 4,
  },
});
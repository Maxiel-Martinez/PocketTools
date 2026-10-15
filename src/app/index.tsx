import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Camara() {
  const [foto, setFoto] = useState<string | null>(null);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        Platform.OS === 'ios'
          ? 'Actívalo en Ajustes > PocketTools > Cámara.'
          : 'Actívalo en Ajustes > Aplicaciones > PocketTools > Permisos.'
      );
      return;
    }
    const r = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!r.canceled) setFoto(r.assets[0].uri);
  };

  return (
    <View style={s.container}>
      <View style={s.card}>
        {foto ? (
          <Image source={{ uri: foto }} style={s.img} />
        ) : (
          <Text style={s.placeholder}>Aún no hay foto 📷</Text>
        )}
      </View>
      <Pressable style={s.btn} onPress={tomarFoto}>
        <Text style={s.btnText}>Tomar foto</Text>
      </Pressable>
    </View>
  );
}

export const cardShadow = Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 6 },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA', alignItems: 'center', padding: 20 },
  card: { width: '100%', height: 380, backgroundColor: '#fff', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginTop: 10, ...cardShadow },
  img: { width: '100%', height: '100%' },
  placeholder: { color: '#999', fontSize: 16 },
  btn: { backgroundColor: '#6C5CE7', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, marginTop: 24 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
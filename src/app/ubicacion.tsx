import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function Ubicacion() {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const obtener = async () => {
    setError('');
    setCargando(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permiso de ubicación denegado.');
      setCargando(false);
      return;
    }
    const pos = await Location.getCurrentPositionAsync({
      accuracy: Platform.OS === 'android' ? Location.Accuracy.Balanced : Location.Accuracy.High,
    });
    setCoords(pos.coords);
    setCargando(false);
  };

  return (
    <View style={s.container}>
      <View style={s.card}>
        <Text style={s.label}>Latitud</Text>
        <Text style={s.value}>{coords ? coords.latitude.toFixed(5) : '—'}</Text>
        <Text style={s.label}>Longitud</Text>
        <Text style={s.value}>{coords ? coords.longitude.toFixed(5) : '—'}</Text>
        <Text style={s.label}>Sistema</Text>
        <Text style={s.value}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
        {error ? <Text style={s.error}>{error}</Text> : null}
      </View>
      <Pressable style={s.btn} onPress={obtener}>
        {cargando ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Obtener ubicación</Text>}
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA', alignItems: 'center', padding: 20 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 24, marginTop: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 6 },
    }) },
  label: { color: '#888', fontSize: 13, marginTop: 12 },
  value: { fontSize: 22, fontWeight: '700', color: '#2D3436' },
  error: { color: '#D63031', marginTop: 16 },
  btn: { backgroundColor: '#6C5CE7', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, marginTop: 24 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
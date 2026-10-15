import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AREA = 260;
const BOLA = 50;

export default function Nivel() {
  const [{ x, y }, setData] = useState({ x: 0, y: 0 });
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    let sub: { remove: () => void } | undefined;
    (async () => {
      try {
        const ok = await Accelerometer.isAvailableAsync();
        setDisponible(ok);
        if (!ok) return;
        Accelerometer.setUpdateInterval(60);
        sub = Accelerometer.addListener(({ x, y }) => setData({ x, y }));
      } catch {
        setDisponible(false);
      }
    })();
    return () => sub?.remove();
  }, []);

  const max = (AREA - BOLA) / 2;
  const posX = Math.max(-max, Math.min(max, x * max * 2));
  const posY = Math.max(-max, Math.min(max, -y * max * 2));
  const nivelado = Math.abs(x) < 0.03 && Math.abs(y) < 0.03;

  return (
    <View style={s.container}>
      <View style={s.area}>
        <View style={s.cruzH} />
        <View style={s.cruzV} />
        <View style={[s.bola, { transform: [{ translateX: posX }, { translateY: posY }],
          backgroundColor: nivelado ? '#00B894' : '#6C5CE7' }]} />
      </View>
      {!disponible && <Text style={s.datos}>Sensor no disponible en este dispositivo</Text>}
      <Text style={s.estado}>{nivelado ? '✅ ¡Nivelado!' : 'Inclina el celular'}</Text>
      <Text style={s.datos}>X: {x.toFixed(2)}   Y: {y.toFixed(2)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA', alignItems: 'center', justifyContent: 'center' },
  area: { width: AREA, height: AREA, borderRadius: AREA / 2, backgroundColor: '#fff',
    borderWidth: 3, borderColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center' },
  cruzH: { position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd' },
  cruzV: { position: 'absolute', height: '100%', width: 1, backgroundColor: '#ddd' },
  bola: { width: BOLA, height: BOLA, borderRadius: BOLA / 2 },
  estado: { fontSize: 20, fontWeight: '700', marginTop: 30, color: '#2D3436' },
  datos: { color: '#888', marginTop: 8 },
});
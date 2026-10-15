import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const ios = Platform.OS === 'ios';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6C5CE7',
        headerStyle: { backgroundColor: '#6C5CE7' },
        headerTintColor: '#fff',
        tabBarStyle: { height: ios ? 90 : 65, paddingBottom: ios ? 28 : 8 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Cámara',
        tabBarIcon: ({ color, size }) => <Ionicons name="camera" size={size} color={color} /> }} />
      <Tabs.Screen name="ubicacion" options={{ title: 'Ubicación',
        tabBarIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} /> }} />
      <Tabs.Screen name="nivel" options={{ title: 'Nivel',
        tabBarIcon: ({ color, size }) => <Ionicons name="speedometer" size={size} color={color} /> }} />
    </Tabs>
  );
}
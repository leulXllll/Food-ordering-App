// /app/menu/[id].tsx

import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import { menuItems } from '@/constants/MenuData';

export default function MenuItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const item = menuItems.find((m) => m.id === id);

  if (!item) return <Text style={{ padding: 20 }}>Item not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)} ETB</Text>
      <Text style={styles.title}>{item.description}</Text>
      <Text style={styles.title}>{item.ingredients}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', flex: 1 },
  image: { width: 200, height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700' },
  price: { fontSize: 18, color: '#eb3838ff', marginTop: 10 },
});

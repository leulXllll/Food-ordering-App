import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { cartItems, removeItem, updateItem, getTotal, clearCart } = useCart();
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.quantity} x {item.price} ETB</Text>
        <Text style={styles.total}>{item.price * item.quantity} ETB</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => updateItem(item.id, { quantity: item.quantity - 1 })}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateItem(item.id, { quantity: item.quantity + 1 })}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={[styles.actionText, { color: 'red' }]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: {getTotal().toFixed(2)} ETB</Text>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={{ color: 'white' }}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  total: {
    fontWeight: '500',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: '#c43e3e',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});

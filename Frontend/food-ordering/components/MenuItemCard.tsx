import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface MenuItemCardProps {
  title: string;
  image: string;
  price: number;
  onPress?: () => void;
  width: number;
  onAddToCart?: () => void;
}

const MenuItemCard = ({ title, image, price, onPress, width, onAddToCart }: MenuItemCardProps) => {
  return (
    <TouchableOpacity style={[styles.card, { width }]} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price.toFixed(2)} ETB</Text>
      <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
        <FontAwesome name="shopping-basket" size={10} color="white" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>  
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0', // temporary gray background for debugging
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: '500',
    color: '#eb3838ff',
  },
  cartButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#185c59ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 6,
  },
});

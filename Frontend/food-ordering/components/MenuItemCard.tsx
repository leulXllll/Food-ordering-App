import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface MenuItemCardProps {
  title: string;
  image: string;
  price: number;
  id: string;
  width: number;
  onAddToCart?: () => void;
}

const MenuItemCard = ({ title, image, price, width, id, onAddToCart }: MenuItemCardProps) => {
  const router = useRouter();

  const onCardPress = () => {
    router.push(`/menu/${id}`);
  };

  
  const onAddToCartPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={onCardPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price.toFixed(2)} ETB</Text>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCartPress}
        activeOpacity={0.7}
      >
        <FontAwesome name="shopping-basket" size={14} color="white" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
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

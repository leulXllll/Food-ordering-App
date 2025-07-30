import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
  ActivityIndicator, 
} from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react'; 
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useCart } from '@/contexts/CartContext';


interface MenuItem {
  ingredient: string;
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const API_URL = 'http://localhost:3000/menu'; 

const { width } = Dimensions.get('window');

export default function MenuItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { addItem, cartItems } = useCart();

  
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!id) {
        setError("No item ID provided.");
        setIsLoading(false);
        return;
    };

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Item not found or server error (status: ${response.status})`);
        }
        const data: MenuItem = await response.json();
        setItem(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch item details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);
  
  // Hide the tab bar on this screen
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  const handleAddToCart = () => {
    if (!item) return; 
    addItem({
      id: String(item.id),
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!item) {
    return (
        <View style={styles.centered}>
            <Text>Item not found.</Text>
        </View>
    );
  }

  // Render main component with fetched data
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>

        <Pressable style={styles.buttonStyle} onPress={() => router.push('/cart')}>
          <AntDesign name="shoppingcart" size={23} color="black" />
          {totalItems > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode='cover' />
        </View>
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.ingredient}>{item.ingredient}</Text>

        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.cartFooter}>
        <TouchableOpacity onPress={handleAddToCart} style={styles.cartButton}>
          <FontAwesome name="shopping-basket" size={16} color="white" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:30,
  },
   centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: '#F4A940',
    zIndex: 10,
  }, backButtonText: {
        fontSize: 16,
        color: '#ff6347',
        fontWeight: 'bold',
    },
  buttonStyle: {
        backgroundColor: '#f1eeeeff',
        padding: 8, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, 
        width: 42, 
        height: 42,
    },
    badgeContainer: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#f1eeeeff', 
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
  headerIcon: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#d5d2d2ff',
    // borderWidth:1
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageWrapper: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#e5e5e5ff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    color: '#e53935',
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  ingredient: {
    fontSize: 15,
    lineHeight: 20,
    color: '#444',
    marginLeft: 6,
  },
  cartFooter: {
    position: 'absolute',
    width: '100%',
    padding: 16,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  cartButton: {
    backgroundColor: '#185c59ff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

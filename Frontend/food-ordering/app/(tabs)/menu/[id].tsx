import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { menuItems } from '@/constants/MenuData';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

export default function MenuItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const item = menuItems.find((m) => m.id === id);

  if (!item) return <Text style={{ padding: 20 }}>Item not found</Text>;

  const handleAddToCart = () => {

    alert(`${item.title} added to cart`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' }, // to hide tab bar
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{fontSize:20}}>{item.title}</Text>

        <TouchableOpacity
          // onPress={() => router.push('/cart')}
          style={styles.headerIcon}>
          <AntDesign name="shoppingcart" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode='cover' />
        </View>
        <View style={styles.content}>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',height:28}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price.toFixed(2)} ETB</Text>
          </View>

          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.sectionHeader}>Ingredients</Text>
          {item.ingredients?.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
          ))}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: '#F4A940',
    zIndex: 10,
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
    marginBottom: 16,
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

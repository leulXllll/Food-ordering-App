import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import MenuItemCard from '../../components/MenuItemCard';
import { menuItems } from '../../constants/MenuData';
import Header from '@/components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/CartContext';

type RootStackParamList = {
  ItemDetail: { itemId: string };
};
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ItemDetail'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<typeof menuItems>([]);

  const router = useRouter();
  
  const { width: screenWidth } = useWindowDimensions(); 
  
  
  const cardWidth = (screenWidth - 48) / 2; 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleItems(menuItems);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  const { addItem } = useCart();

  const renderItem = ({ item }: { item: typeof menuItems[0] }) => (
    <MenuItemCard
      title={item.title}
      image={item.image}
      price={item.price}
      width={cardWidth} 
      id={item.id}
      onAddToCart={() => addItem({
    id: item.id,
    name: item.title, 
    price: item.price,
    image: item.image,
    quantity: 1, 
  })}
    />
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ff6347" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={visibleItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    // backgroundColor: '#185c59ff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
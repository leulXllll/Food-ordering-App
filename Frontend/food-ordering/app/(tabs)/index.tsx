import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, useWindowDimensions, Alert } from 'react-native';
import MenuItemCard from '../../components/MenuItemCard';
import Header from '@/components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCart } from '../../contexts/CartContext';
import SearchInput from '@/components/SearchInput';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}


const API_URL = 'http://127.0.0.1:3000/menu'; 

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = (screenWidth - 48) / 2;
  const { addItem } = useCart();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch menu items. Please check the server.');
        }
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        Alert.alert("Error", err.message || 'Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard
      title={item.name}
      image={item.image } 
      price={item.price}
      width={cardWidth}
      id={String(item.id)} 
      onAddToCart={() => addItem({
        id: String(item.id),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })}
    />
  );
  
  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#ff6347" style={{ marginTop: 50 }} />;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }
    
    return (
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
    );
  };


  return (
    <>
      <Header />
      <SearchInput />
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>
        {renderContent()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
    fontSize: 16,
  },
});


export default HomeScreen;
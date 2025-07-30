import React, { useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Alert, // Import Alert for feedback
    ActivityIndicator // Import ActivityIndicator for loading state
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const API_URL = 'http://localhost:3000/order';
interface Order {
    id: number; 
}
export default function CartScreen() {
    const { cartItems, removeItem, updateItem, getTotal, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOrderNow = async () => {
        if (cartItems.length === 0) {
            Alert.alert("Empty Cart", "Please add items to your cart before placing an order.");
            return;
        }

        if (isSubmitting) return; 

        setIsSubmitting(true);

        const orderPayload = {
            items: cartItems.map(item => ({
                id: parseInt(item.id, 10), 
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (!response.ok) {
                
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong with your order.');
            }
            
            const newOrder:Order = await response.json();

            Alert.alert(
                "Order Placed!",
                `Your order #${newOrder.id} has been successfully submitted.`
            );

            clearCart();
        router.push({
                pathname: '/order/[id]',
                  params: { id: newOrder.id },
                });

        } catch (error: any) {
            Alert.alert("Submission Failed", error.message);
        } finally {
            setIsSubmitting(false); // R
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.quantity} x ${item.price.toFixed(2)}</Text>
                <Text style={styles.total}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => updateItem(item.id, { quantity: item.quantity - 1 })} disabled={isSubmitting}>
                    <FontAwesome name="minus" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateItem(item.id, { quantity: item.quantity + 1 })} disabled={isSubmitting}>
                    <FontAwesome name="plus" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item.id)} disabled={isSubmitting}>
                    <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            {cartItems.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Total: ${getTotal().toFixed(2)}</Text>
                        <View style={styles.footerButtons}>
                            <TouchableOpacity style={styles.clearButton} onPress={clearCart} disabled={isSubmitting}>
                                <Text style={{ color: 'white' }}>Clear Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.orderButton, isSubmitting && styles.disabledButton]}
                                onPress={handleOrderNow}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={{ color: 'white' }}>Order Now</Text>
                                )}
                            </TouchableOpacity>
                        </View>
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
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        alignItems: 'center',
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
        gap: 16,
        alignItems: 'center',
    },
    footer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'right',
    },
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clearButton: {
        backgroundColor: '#c43e3e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
    },
    orderButton: {
        backgroundColor: '#2e7d32',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    disabledButton: {
        backgroundColor: '#9e9e9e', 
    },
});
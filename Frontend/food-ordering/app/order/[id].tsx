import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

interface OrderItem {
    itemId: number;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    createdAt: string;
}

const API_URL = 'http://localhost:3000/order';

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Order not found.');
                }
                const data = await response.json();
                setOrder(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.centered} />;
    }

    if (error || !order) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error || 'Could not load order.'}</Text>
                <Link href="/" asChild>
                    <Text style={styles.link}>← Back to Menu</Text>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmed!</Text>
            <Text style={styles.subtitle}>Order #{order.id}</Text>
            
            <FlatList
                data={order.items}
                keyExtractor={(item) => String(item.itemId)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                )}
                ListHeaderComponent={<Text style={styles.itemsHeader}>Order Summary</Text>}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Total: ${order.totalPrice.toFixed(2)}</Text>
                        <Text style={styles.statusText}>Status: {order.status}</Text>
                    </View>
                }
            />

            <Link href="/" asChild>
                <Text style={styles.link}>← Back to Menu</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
    subtitle: { fontSize: 18, color: '#666', textAlign: 'center', marginBottom: 20 },
    errorText: { fontSize: 18, color: 'red', marginBottom: 20 },
    itemsHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
    itemName: { fontSize: 16 },
    itemPrice: { fontSize: 16, color: '#333' },
    footer: { marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderColor: '#ccc' },
    totalText: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
    statusText: { fontSize: 16, color: '#666', textAlign: 'right', marginTop: 5 },
    link: { fontSize: 16, color: '#007BFF', fontWeight: 'bold', textAlign: 'center', marginTop: 30 },
});
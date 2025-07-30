import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';


import { useCart } from '../contexts/CartContext';

export default function Header({ title = "Explore the taste of Ethiopian Food" }) {
    const router = useRouter();
    const { width: screenWidth } = useWindowDimensions();

    const { cartItems } = useCart();

    //  Calculate the total number of items by summing their quantities
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <View style={styles.container}>
            {/* Curved Yellow Background */}
            <View style={styles.curveContainer}>
                <Svg
                    height="100%"
                    width={screenWidth}
                    viewBox={`0 0 ${screenWidth} 200`}
                >
                    <Path
                        d={`
                          M0,0 
                          H${screenWidth} 
                          V150 
                          Q${screenWidth * 0.8} 200 0 150 
                          Z
                        `}
                        fill="#F4A940"
                    />
                </Svg>
            </View>

            {/* Text and Content */}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 100 }}>
                    <Pressable style={styles.buttonStyle} onPress={() => router.push('/cart')}>
                        <AntDesign name="shoppingcart" size={23} color="black" />
                        {/* The badge will only render if there are items in the cart */}
                        {totalItems > 0 && (
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{totalItems}</Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable style={styles.buttonStyle} onPress={() => router.push('/person')}>
                        <MaterialIcons name="person" size={23} color='black' />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 200,
        width: '100%',
    },
    curveContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        zIndex: -1,
    },
    content: {
        paddingTop: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        width: '50%'
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
    }
});

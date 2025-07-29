import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'; 
import Svg, { Path } from 'react-native-svg';


export default function Header({ title = "Explore the taste of Ethiopian Food" }) {

    const { width: screenWidth } = useWindowDimensions();

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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
});
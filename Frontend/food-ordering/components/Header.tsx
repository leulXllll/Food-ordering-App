import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions ,TextInput, Pressable} from 'react-native'; 

import Svg, { Path } from 'react-native-svg';

export default function Header({ title = "Explore the taste of Ethiopian Food" }) {

    const [text,setText] = useState('');
    const router = useRouter();

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
                <View style={{flexDirection:'row',justifyContent:'space-around',width:100}}>
                <Pressable style={styles.buttonStyle} onPress={()=>router.push('/cart')}>
                    <AntDesign name="shoppingcart" size={23} color="black" />                    
                </Pressable>
                <Pressable style={styles.buttonStyle} onPress={()=>router.push('/person')}>
              <MaterialIcons name="person" size={23} color='black' />
                </Pressable>
                </View>
            </View>
            <View style={{ backgroundColor: '#f5f5f5ff',marginTop:15,width:'70%',alignSelf:'center',borderRadius:10,borderWidth:1,borderBlockColor:'#185c59ff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                            <MaterialIcons name='search' size={20} color='black' style={{marginLeft:6}}/>
                            <TextInput
                            placeholder='Search for your food'
                            style={{color:'#185c59ff',marginLeft: 6,
                                    flex: 1,
                                height: 40}}
                            value={text}
                            onChangeText={setText}
                            />
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
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        width:'50%'
    },
    buttonStyle:{
        backgroundColor:'#f1eeeeff',
        paddingVertical:2,
        paddingHorizontal:9,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:"35%"
    }
});
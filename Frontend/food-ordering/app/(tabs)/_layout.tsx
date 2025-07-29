import { Tabs } from 'expo-router';

import { Text, View, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ICON_SIZE = 28;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          marginBottom: 40,
          marginHorizontal: 10,
          borderRadius: 15,
          height: 80,
          paddingTop: 17,
          paddingBottom: 17,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown:false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center', display: 'flex', flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: focused ? '#F4A940' : 'transparent',
              paddingHorizontal: focused ? 8 : 5
            }}>
              <FontAwesome5 name="home" size={ICON_SIZE} color={color} />
              {focused && <Text style={{ fontSize: 10, color }}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center', display: 'flex', flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: focused ? '#F4A940' : 'transparent',
              paddingHorizontal: focused ? 8 : 5
            }}>
              <MaterialIcons name="receipt-long" size={ICON_SIZE} color={color} />
              {focused && <Text style={{ fontSize: 10, color }}>Order</Text>}
            </View>
          ),

        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center', display: 'flex', flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: focused ? '#F4A940' : 'transparent',
              paddingHorizontal: focused ? 8 : 5
            }}>
              <MaterialIcons name="settings" size={ICON_SIZE} color={color} />
              {focused && <Text style={{ fontSize: 10, color }}>Setting</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center', display: 'flex', flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: focused ? '#F4A940' : 'transparent',
              paddingHorizontal: focused ? 8 : 5
            }}>
              <MaterialIcons name="person" size={ICON_SIZE} color={color} />
              {focused && <Text style={{ fontSize: 10, color }}>Profile</Text>}
            </View>
          ),
        }}
      />
       <Tabs.Screen
        name="menu/[id]"
        options={{
          href: null, // hides it from the tab bar 
        }}
      />
    </Tabs>
  );
}


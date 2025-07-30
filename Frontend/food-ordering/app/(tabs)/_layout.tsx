import { Tabs } from 'expo-router';

import { Text, View, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ICON_SIZE = 24;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
         flex: 1,
         maxWidth: 120,
         justifyContent: 'center',
         alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          marginBottom: 40,
          borderRadius: 15,
          height: 80,
          paddingTop: 15,
          paddingBottom: 12,
          paddingHorizontal: 5,
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


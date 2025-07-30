import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput, View } from "react-native";
import { useState } from "react";

export default function SearchInput() {
        const [text,setText] = useState('');

    return (  <View style={{ backgroundColor: '#f5f5f5ff',marginTop:-39,marginBottom:23,width:'70%',alignSelf:'center',borderRadius:10,borderWidth:1,borderBlockColor:'#185c59ff',flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
                                <MaterialIcons name='search' size={20} color='black' style={{marginLeft:6}}/>
                                <TextInput
                                placeholder='Search for your food'
                                style={{color:'#185c59ff',marginLeft: 6,
                                        flex: 1,
                                    height: 40}}
                                value={text}
                                onChangeText={setText}
                                />
                </View>)
 
}
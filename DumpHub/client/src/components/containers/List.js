import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native'
import Item from './Item'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

export default function List({placeList}) {
    const navigation=useNavigation();
    return (
      <View >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "white"]}
          style={{ padding: 20,  width: Dimensions.get("screen").width }}
        >
          <FlatList
          data={placeList}
          horizontal={true}
          renderItem={({item,index})=>index<=6&&(
          <TouchableOpacity onPress={
              ()=> {
                
                navigation.navigate('Places',{ place: item })
              }
            }>
              <Item place={item} />
          </TouchableOpacity>
          )}
          />
        </LinearGradient>
      </View>
  )
}
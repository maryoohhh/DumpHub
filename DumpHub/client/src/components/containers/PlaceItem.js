import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export default function PlaceItem({place}) {
  return (
    <View style = {{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        gap: 15,
        marginTop: 20
    }}>
        <Image source = {{ uri: 
            "https://maps.googleapis.com/maps/api/place/photo"+
            "?maxwidth=400"+
            "&photo_reference="+
            place?.photos[0]?.photo_reference+
            "&key=AIzaSyAFEDZC2XNZPGRH04T9nMN4Zq9bGwIxF3o"
            }}
            style = {{ width: 110, height: 110, borderRadius: 15 }} />
        <View style = {{ flex: 1 }}>
            <Text numberOfLines={2} style = {{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{place.name}</Text>
            <Text numberOfLines={2} style = {{ fontSize: 18, marginBottom: 5  }}>{place.vicinity}</Text>
            <View style = {{ display: 'flex', gap: 5, alignItems: 'center', flexDirection: 'row' }}>
                <AntDesign name="star" size={20} color="gold" />
                <Text>{place.rating}</Text>
            </View>
        </View>
    </View>
  )
}

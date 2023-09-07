import { Share } from "react-native"

const SharePlace=(place)=>{

    const address = place?.vicinity ? place?.vicinity : place.formatted_address;

    try {
        Share.share({
            title:'Share Business',
            message: "Restroom Name: " + place.name + "\n" + "Address: " + address,
        })
    } catch (error) {
        // handle error
    }
}

export default {
    SharePlace
}

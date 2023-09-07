import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place"
const API_KEY = "AIzaSyAFEDZC2XNZPGRH04T9nMN4Zq9bGwIxF3o"

const lat = 47.628648974105786
const lng = -122.13461955264611

const nearByPlace = () => axios.get(BASE_URL+
    "/nearbysearch/json?"+
    "&location="+lat+","+lng+"&radius=1500&type=restaurant"
    +"&key="+API_KEY)

const searchByText = (searchText) => axios.get(BASE_URL+
    "/textsearch/json?query="+searchText+
    "&key="+API_KEY
    )

export default {
    nearByPlace,
    searchByText
}
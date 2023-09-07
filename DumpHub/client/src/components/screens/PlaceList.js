import React, { Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import { Container, Content } from "native-base";

//Components
import RenderStarReview from "./ReviewStar";

const apiKey = 'AIzaSyAFEDZC2XNZPGRH04T9nMN4Zq9bGwIxF3o';

class PlaceList extends Component {
  render() {
    const { places } = this.props;
    const baseImage =
      "https://images.unsplash.com/photo-1552334405-4929565998d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
    return (
      <Container style={styles.container2}>
        <Content>
          {places.length <= 0 && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {places.length > 0 && (
            <FlatList
              data={places}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <ListItem
                    key={item.id}
                    title={
                      <View style={styles.rowDirection}>
                        <Text>{item.name}</Text>
                        <Text>1.4km</Text>
                      </View>
                    }
                    subtitle={
                      item.rating && (
                        <View>
                          <View style={styles.startReviewsContainer}>
                            <RenderStarReview stars={item.rating} />
                            <Text>{item.rating.toFixed(1)}</Text>
                          </View>
                          <View>
                            <Text>{item.vicinity}</Text>
                          </View>
                        </View>
                      )
                    }
                    leftAvatar={{
                      rounded: false,
                      size: "large",
                      source: item.photos && {
                        uri:
                          item.photos.length > 0
                            ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&sensor=false&maxheight=${item.photos[0].height}&maxwidth=${item.photos[0].width}&key=${apiKey}`
                            : baseImage
                      }
                    }}
                    bottomDivider
                    chevron={{ color: "#e90000", size: 30 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between"
    },
    container2: {
      flex: 1,
      justifyContent: "center"
    },
    menuTitle: {
      fontSize: 16,
      fontFamily: "Poppins-Medium",
      color: "#575757",
      marginLeft: 20,
      marginTop: 10
    },
    mapView: {
      flex: 1,
      justifyContent: "center"
    },
    restaurantList: {
      flex: 1,
      justifyContent: "center"
    },
    chevron: {
      color: "#e90000"
    },
    rowDirection: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    startReviewsContainer: {
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center"
    }
});

export default PlaceList;

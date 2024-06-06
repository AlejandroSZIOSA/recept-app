import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function RecipeDetails({ itemObj, nav }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => nav.navigate("DETAILS_SC", itemObj)}>
          <Text>{itemObj.title}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button title=">" onPress={() => nav.navigate("DETAILS_SC", itemObj)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: 350,
    height: 50,
    justifyContent: "space-around",
    backgroundColor: "yellow",
  },
});

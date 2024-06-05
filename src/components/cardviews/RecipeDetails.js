import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function RecipeDetails({ itemObj, nav }) {
  return (
    <View style={styles.container}>
      <Text>{itemObj.title}</Text>
      <Button title=">" onPress={() => nav.navigate("DETAILS_SC", itemObj)} />
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

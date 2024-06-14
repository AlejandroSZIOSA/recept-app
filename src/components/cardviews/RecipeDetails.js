import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function RecipeDetails({ itemObj, nav }) {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => nav.navigate("DETAILS_SC", itemObj)}>
          <Text style={{ fontSize: 27 }}>{itemObj.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginRight: 10 }}>
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
    paddingVertical: 10,
    justifyContent: "space-between",
    backgroundColor: "#FFB379",
    borderRadius: 10,
  },
});

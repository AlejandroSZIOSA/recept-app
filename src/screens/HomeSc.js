import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import RecipeDetails from "../components/cardviews/RecipeDetails";

const TEST_LIST = [
  {
    id: 1,
    title: "title_1",
    description: "description_1",
    cocking_time: "20 min",
  },
  {
    id: 2,
    title: "title_2",
    description: "description_2",
    cocking_time: "30 min",
  },
];

export default function HomeSc({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Recept App</Text>
      <ScrollView>
        <FlatList
          data={TEST_LIST}
          renderItem={({ item }) => (
            <RecipeDetails itemObj={item} nav={navigation} />
          )}
          keyExtractor={(item) => item.id}
          /* style={styles.listContainer} */
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

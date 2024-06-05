import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import RecipeDetails from "../components/cardviews/RecipeDetails";

//SEARCH BAR IMPORTS
import { PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const TEST_LIST = [
  {
    id: 1,
    title: "title 1",
    description: "description_1",
    cocking_time: "20 min",
  },
  {
    id: 2,
    title: "title 2",
    description: "description_2",
    cocking_time: "30 min",
  },
];

export default function HomeSc({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(""); //SEARCH_QUERY
  const [todos, setTodos] = useState(TEST_LIST);
  const [filteredTodos, setFilteredTodos] = useState(todos); //SET_FILTERS

  //When text changes
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterTodos(query);
  };

  //Filter items
  const filterTodos = (query) => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Recept App</Text>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => setSearchQuery("")}
          />
          <ScrollView>
            <FlatList
              data={filteredTodos}
              renderItem={({ item }) => (
                <RecipeDetails itemObj={item} nav={navigation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              /* style={styles.listContainer} */
            />
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
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

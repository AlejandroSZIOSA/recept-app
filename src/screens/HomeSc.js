import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import RecipeDetails from "../components/cardviews/RecipeDetails";

//SEARCH BAR IMPORTS
import { PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

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

export default function HomeSc({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState(""); //SEARCH_QUERY
  const [todos, setTodos] = useState();
  const [filteredTodos, setFilteredTodos] = useState(todos); //SET_FILTERS

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData1();
    if (route.params?.todoId) {
      console.log(route.params.todoId);
      handleDelete(route.params.todoId);
    }
  }, [route.params?.todoId]);

  const fetchData1 = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000");
      data = response.data;
      console.log(data);
      setTodos(data); //working
    } catch (error) {
      console.info(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/recipes/${id}`);
      console.log("item" + id + "DELETED");
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

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

  if (loading)
    return (
      <View>
        <Text>Loading Todos................</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Recipes App</Text>
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
                <RecipeDetails
                  itemObj={item}
                  nav={navigation}
                  handleDeleteFN={handleDelete}
                />
              )}

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

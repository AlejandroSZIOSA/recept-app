import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import RecipeDetails from "../components/cardviews/RecipeDetails";
import { PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function HomeSc({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState(); //SEARCH_QUERY
  const [recipes, setRecipes] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState(); //SET_FILTERS

  const [loading, setLoading] = useState(false);

  const [newRecipe, setNewRecipe] = useState();

  useEffect(() => {
    fetchRecipes();
    if (route.params?.todoId) {
      console.log(route.params.todoId);
      handleDelete(route.params.todoId);
      fetchRecipes();
    }
    if (route.params?.newRecipe) {
      const newRecipe = route.params?.newRecipe;
      setNewRecipe(newRecipe);
      console.log("new recipe" + newRecipe);
    }
  }, [route.params?.todoId, route.params?.newRecipe]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000");
      const data = response.data;
      //console.log(data);
      setSearchQuery("");
      setRecipes(data); //working
      setFilteredRecipes(data);
      setLoading(false);
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  function getLatestRecipeId() {
    let lastRecipeId = stateTodoList[stateTodoList.length - 1];
    return lastRecipeId.id;
  }
  const handleAddRecipe = () => {};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/recipes/${id}`);
      console.log("item " + id + " DELETED");
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  //When text changes
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterRecipes(query);
  };

  //Filter items
  const filterRecipes = (query) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
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
              data={filteredRecipes}
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

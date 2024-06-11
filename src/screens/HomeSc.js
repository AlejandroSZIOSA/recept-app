import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
} from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import RecipeDetails from "../components/cardviews/RecipeDetails";
import { PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import COLORS from "../constants/colors";

export default function HomeSc({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState(); //SEARCH_QUERY
  const [recipes, setRecipes] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState(); //SET_FILTERS
  const [loading, setLoading] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    fetchRecipes();
    if (route.params?.todoId) {
      console.log(route.params.todoId);
      handleDelete(route.params.todoId);
      fetchRecipes();
    }

    if (route.params?.newRecipe) {
      const newRecipe = route.params?.newRecipe;
      addNewRecipe(newRecipe);
      fetchRecipes();
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

  const addNewRecipe = async (newRecipe) => {
    let lastRecipeId = recipes[recipes.length - 1];
    const newId = lastRecipeId.id + 1;
    newRecipe.id = newId; //Add new id property to the object
    try {
      const response = await axios.post(
        "http://localhost:4000/recipes",
        newRecipe
      );
      console.log("Success", `RECIPE CREATED: ${response.data}`);
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

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
      <Text style={{ fontSize: 40, paddingVertical: 10 }}>Recipes</Text>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => setSearchQuery("")}
            style={styles.searchbar}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
            }}
          >
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>By title</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>By Cooking T</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>
          <ScrollView>
            <FlatList
              data={filteredRecipes}
              renderItem={({ item }) => (
                <View style={{ marginVertical: 8 }}>
                  <RecipeDetails
                    itemObj={item}
                    nav={navigation}
                    handleDeleteFN={handleDelete}
                  />
                </View>
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
    backgroundColor: COLORS.APP_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    width: 350,
    height: 50,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 30,
  },
  switchText: {
    fontSize: 18,
  },
});

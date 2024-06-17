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

  //Switches

  const [isByTitleEnabled, setIsByTitleEnabled] = useState(true);
  const [isByCookingTimeEnabled, setIsByCookingTimeEnabled] = useState(false);

  const toggleSwitchByCt = () => {
    setIsByCookingTimeEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    fetchRecipes();
    if (route.params?.todoId) {
      //console.log(route.params.todoId);
      handleDelete(route.params.todoId);
    }
    if (route.params?.newRecipe) {
      const newRecipe = route.params?.newRecipe;
      addNewRecipe(newRecipe);
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
    let lastRecipe = recipes[recipes.length - 1];
    if (lastRecipe !== undefined) {
      console.log(lastRecipe);
      let newId = lastRecipe.id + 1;
      newRecipe.id = newId; //Add new id property to the object
    } else newRecipe.id = 1;
    try {
      const response = await axios.post(
        "http://localhost:4000/recipes",
        newRecipe
      );
      fetchRecipes(); //Fix problem
      console.log("Success", `RECIPE CREATED: ${response.data}`);
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/recipes/${id}`);
      console.log("item ID" + id + " DELETED");
      fetchRecipes(); //Fix problem
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
    if (isByTitleEnabled) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
    if (isByCookingTimeEnabled) {
      const filtered = recipes.filter((recipe) =>
        recipe.cocking_time.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
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
              justifyContent: "center",
            }}
          >
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>By Cooking T</Text>
              <Switch
                trackColor={{ false: "#BCBCBC", true: "#81b0ff" }}
                thumbColor={isByCookingTimeEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchByCt}
                value={isByCookingTimeEnabled}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.APP_BACKGROUND,
  },
});

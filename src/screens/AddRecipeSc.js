import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
import BottomBar from "../components/BottomBar";

export default function AddRecipeSc({ navigation }) {
  const [titleInput, setTitleInput] = useState("");
  const [ingredientsStepsInput, setIngredientsStepsInput] = useState("");
  const [cookingTimeInput, setCookingTimeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleCreateNewRecipe() {
    const isTitleInputEmpty = !titleInput ? true : false;
    const isIngredientsStepsInputEmpty = !ingredientsStepsInput ? true : false;
    const isCookingTimeInputEmpty = !cookingTimeInput ? true : false; //

    if (
      !isTitleInputEmpty &&
      !isIngredientsStepsInputEmpty &&
      !isCookingTimeInputEmpty
    ) {
      setErrorMessage("");
      const newRecipeObj = {
        title: titleInput,
        ingredients_steps: ingredientsStepsInput,
        cocking_time: cookingTimeInput,
      };
      navigation.navigate("HOME_SC", { newRecipe: newRecipeObj });
    } else {
      setErrorMessage("Error: Inputs");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text style={styles.text}>Title :</Text>
          <TextInput
            placeholder="Write here"
            onChangeText={(titleInput) => setTitleInput(titleInput)}
            style={{
              fontSize: 22,
              backgroundColor: "white",
              borderBlockColor: "black",
              borderWidth: 1,
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Ingredients and steps</Text>
          <ScrollView>
            <View style={styles.ingredientsContainer}>
              <TextInput
                editable
                multiline
                numberOfLines={20}
                style={styles.text}
                maxLength={300}
                placeholder="Write here"
                onChangeText={(ingredientsStepsInput) =>
                  setIngredientsStepsInput(ingredientsStepsInput)
                }
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Cooking T :</Text>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "white",
              borderBlockColor: "black",
              borderWidth: 1,
            }}
            placeholder="Write here"
            onChangeText={(cookingTimeInput) =>
              setCookingTimeInput(cookingTimeInput)
            }
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25 }}>{errorMessage}</Text>
      </View>
      <BottomBar title="add" onPressFN={handleCreateNewRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.APP_BACKGROUND,
  },
  innerContainer: {
    width: 380,
    height: 670,
    justifyContent: "space-around",
    /* backgroundColor: "yellow", */
  },
  text: { fontSize: 27 },
  ingredientsContainer: {
    width: 350,
    height: 500,
    borderColor: "#111111",
    backgroundColor: "white",
    borderWidth: 2,
    marginLeft: 10,
  },
});

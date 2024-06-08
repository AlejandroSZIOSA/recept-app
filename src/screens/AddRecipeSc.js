import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

export default function AddRecipeSc({ navigation }) {
  const [newRecipe, setNewRecipe] = useState();

  const [titleInput, setTitleInput] = useState();
  const [ingredientsStepsInput, setIngredientsStepsInput] = useState();
  const [cookingTimeInput, setCookingTimeInput] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  function createNewRecipe() {
    const newRecipe = {
      title: titleInput,
      ingredients_stepsInput: ingredientsStepsInput,
      cooking_time: cookingTimeInput,
    };
    return newRecipe;
  }

  function handleCreateNewRecipe() {
    /* const isTitleInputEmpty = !titleInput ? true : false;
    const isIngredientsStepsInputEmpty = !ingredientsStepsInput ? true : false;
    const isCookingTimeInputEmpty = !cookingTimeInput ? true : false; //

    if (
      !isTitleInputEmpty &&
      !isIngredientsStepsInputEmpty &&
      !isCookingTimeInputEmpty
    ) {
      const newRecipe = createNewRecipe();
      navigation.navigate("HOME_SC", newRecipe);
    } else {
      setErrorMessage("Error Inputs");
    } */

    const newRecipe = {
      title: "new recipe",
      ingredients_steps: "new",
    };
    navigation.navigate("HOME_SC", { newRecipe: newRecipe });
  }

  return (
    <View>
      <View>
        <Text>Title :</Text>
        <TextInput placeholder="Write here" />
      </View>
      <View>
        <Text>Ingredients and steps :</Text>
        <TextInput placeholder="Write here" />
      </View>
      <View>
        <Text>Cooking time :</Text>
        <TextInput placeholder="Write here" />
      </View>
      <View>
        <Button title="add" onPress={handleCreateNewRecipe} />
      </View>
      <View>
        <Text>{errorMessage}</Text>
      </View>
    </View>
  );
}

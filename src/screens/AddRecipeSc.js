import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

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
      const newRecipeObj = {
        title: titleInput,
        ingredients_steps: ingredientsStepsInput,
        cocking_time: cookingTimeInput,
      };
      navigation.navigate("HOME_SC", { newRecipe: newRecipeObj });
    } else {
      setErrorMessage("Error Inputs");
    }
  }

  return (
    <View>
      <View>
        <Text>Title :</Text>
        <TextInput
          placeholder="Write here"
          onChangeText={(titleInput) => setTitleInput(titleInput)}
        />
      </View>
      <View>
        <Text>Ingredients and steps :</Text>
        <TextInput
          placeholder="Write here"
          onChangeText={(ingredientsStepsInput) =>
            setIngredientsStepsInput(ingredientsStepsInput)
          }
        />
      </View>
      <View>
        <Text>Cooking time :</Text>
        <TextInput
          placeholder="Write here"
          onChangeText={(cookingTimeInput) =>
            setCookingTimeInput(cookingTimeInput)
          }
        />
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

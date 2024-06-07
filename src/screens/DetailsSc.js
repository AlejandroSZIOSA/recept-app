import React from "react";
import { View, Text, Button } from "react-native";

export default function DetailsSc({ navigation, route }) {
  const { id, title, ingredients_steps, cocking_time } = route.params;

  return (
    <View>
      <Text>Recipe Information</Text>
      <Text>{title}</Text>
      <Text>{ingredients_steps}</Text>
      <Text>{cocking_time}</Text>
      <Button
        title="Delete Recipe"
        onPress={() => {
          navigation.navigate("HOME_SC", { todoId: id }); //SEND PARAMS BACK TO THE HOME SCREEN
        }}
      />
    </View>
  );
}

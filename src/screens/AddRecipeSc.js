import React from "react";
import { View, Text, TextInput } from "react-native";

export default function AddRecipeSc() {
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
    </View>
  );
}

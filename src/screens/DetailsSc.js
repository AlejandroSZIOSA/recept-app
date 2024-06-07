import React from "react";
import { View, Text, Button } from "react-native";

export default function DetailsSc({ navigation, route }) {
  const { description, cocking_time, id } = route.params;

  return (
    <View>
      <Text>Details</Text>
      <Text>{description}</Text>
      <Text>{cocking_time}</Text>
      <Button
        title="Delete"
        onPress={() => {
          navigation.navigate("HOME_SC", { todoId: id });
        }}
      />
    </View>
  );
}

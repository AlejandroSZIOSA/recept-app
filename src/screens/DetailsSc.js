import React from "react";
import { View, Text } from "react-native";

export default function DetailsSc({ route }) {
  const { description, cocking_time } = route.params;
  return (
    <View>
      <Text>Details</Text>
      <Text>{description}</Text>
      <Text>{cocking_time}</Text>
    </View>
  );
}

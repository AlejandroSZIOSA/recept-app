import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import COLORS from "../constants/colors";
import BottomBar from "../components/BottomBar";

export default function DetailsSc({ navigation, route }) {
  const { id, ingredients_steps, cocking_time } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, paddingVertical: 10 }}>
        Recipe Information
      </Text>
      <View style={styles.innerContainer}>
        <Text style={styles.textInnerContainer}>Ingredients / steps</Text>
        <ScrollView>
          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsText}>{ingredients_steps}</Text>
          </View>
        </ScrollView>
        <Text style={styles.textInnerContainer}>
          Cooking time: {cocking_time}
        </Text>
      </View>
      <BottomBar
        title="delete"
        color="red"
        onPressFN={() => {
          navigation.navigate("HOME_SC", { todoId: id }); //SEND PARAMS BACK TO THE HOME SCREEN
        }}
      />
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
    flexDirection: "column",
    width: 380,
    height: 620,
    paddingVertical: 10,
  },
  textInnerContainer: {
    fontSize: 30,
    paddingVertical: 10,
    textAlign: "center",
  },
  ingredientsContainer: {
    width: 340,
    height: 500,
    backgroundColor: "white",
    marginHorizontal: "auto",
  },
  ingredientsText: {
    fontSize: 27,
  },
});

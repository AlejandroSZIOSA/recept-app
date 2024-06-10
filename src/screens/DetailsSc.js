import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import COLORS from "../constants/colors";

export default function DetailsSc({ navigation, route }) {
  const { id, ingredients_steps, cocking_time } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, paddingVertical: 10 }}>
        Recipe Information
      </Text>
      <View style={styles.innerContainer}>
        <Text style={styles.textInnerContainer}>Ingredients + steps</Text>
        <ScrollView>
          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsText}>{ingredients_steps}</Text>
          </View>
        </ScrollView>
        <Text style={styles.textInnerContainer}>
          Cooking time: {cocking_time}
        </Text>
      </View>
      <View style={styles.outerBtnContainer}>
        <View style={styles.btnContainer}>
          <Button
            title="Delete"
            color="red"
            onPress={() => {
              navigation.navigate("HOME_SC", { todoId: id }); //SEND PARAMS BACK TO THE HOME SCREEN
            }}
          />
        </View>
      </View>
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
  outerBtnContainer: {
    width: "100%",
    height: 70,
    backgroundColor: COLORS.BOTTOM_BAR_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  btnContainer: {
    width: 80,
    height: 40,
  },
});

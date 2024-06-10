import React from "react";
import { StyleSheet, View, Button } from "react-native";
import COLORS from "../constants/colors";

export default function BottomBar({ title, color = "blue", onPressFN }) {
  return (
    <View style={styles.outerBtnContainer}>
      <View style={styles.btnContainer}>
        <Button title={title} onPress={onPressFN} color={color} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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

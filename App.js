import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View } from "react-native";
import HomeSc from "./src/screens/HomeSc";
import DetailsSc from "./src/screens/DetailsSc";
import AddRecipeSc from "./src/screens/AddRecipeSc";
import COLORS from "./src/constants/colors";
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeSC">
        <RootStack.Screen
          name="HOME_SC"
          component={HomeSc}
          options={({ navigation }) => ({
            title: "Home",
            headerStyle: {
              justifyContent: "space-between",
              backgroundColor: COLORS.NAV_BACKGROUND,
            },
            headerTintColor: COLORS.NAV_TEXT_COLOR,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
            headerRight: () => (
              <View style={{ marginRight: 15, width: 80, height: 33 }}>
                <Button
                  onPress={() => navigation.navigate("ADD_RECIPE_SC")}
                  title="Add"
                />
              </View>
            ),
          })}
        />

        <RootStack.Screen
          name="DETAILS_SC"
          component={DetailsSc}
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: COLORS.NAV_BACKGROUND,
            },
            headerTintColor: COLORS.NAV_TEXT_COLOR,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
          })}
        />
        <RootStack.Screen
          name="ADD_RECIPE_SC"
          component={AddRecipeSc}
          options={{
            title: "Add Recipe",
            headerStyle: {
              backgroundColor: COLORS.NAV_BACKGROUND,
            },
            headerTintColor: COLORS.NAV_TEXT_COLOR,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

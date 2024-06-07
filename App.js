import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import HomeSc from "./src/screens/HomeSc";
import DetailsSc from "./src/screens/DetailsSc";
import AddRecipeSc from "./src/screens/AddRecipeSc";

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
              backgroundColor: "#00D382",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("ADD_RECIPE_SC")}
                title="Add"
              />
            ),
          })}
        />

        <RootStack.Screen
          name="DETAILS_SC"
          component={DetailsSc}
          options={{
            title: "Details",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
          }}
        />
        <RootStack.Screen
          name="ADD_RECIPE_SC"
          component={AddRecipeSc}
          options={{
            title: "ADD RECIPE",
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

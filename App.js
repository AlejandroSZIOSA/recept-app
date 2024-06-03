import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeSc from "./src/screens/HomeSc";
import DetailsSc from "./src/screens/DetailsSc";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeSC">
        <RootStack.Group>
          <RootStack.Screen name="HOME_SC" component={HomeSc} />
        </RootStack.Group>
        <RootStack.Group>
          <RootStack.Screen name="DETAILS_SC" component={DetailsSc} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

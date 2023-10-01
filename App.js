import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateProject from "./src/CreateProject";
import MyProject from "./src/MyProject";
import HomeScreen from "./src/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="MyProjects" component={MyProject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

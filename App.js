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
      {/* Define a navigation stack */}
      <Stack.Navigator initialRouteName="Home">
        {/* Screen for the home page */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Screen for creating a new project */}
        <Stack.Screen name="CreateProject" component={CreateProject} />
        {/* Screen for displaying user's projects */}
        <Stack.Screen name="MyProjects" component={MyProject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

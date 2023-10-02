import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/bck.jpeg")}
      style={styles.container}
    >
      {/* Overlay with a semi-transparent background */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Project Manager</Text>
        <View style={styles.buttonContainer}>
          {/* Button to navigate to Create Project screen */}
          <Button
            title="Create Project"
            onPress={() =>
              navigation.navigate("CreateProject", { project_id: -1 })
            }
            style={styles.button}
          />
          {/* Button to navigate to My Projects screen */}
          <Button
            title="My Projects"
            onPress={() => navigation.navigate("MyProjects")}
            style={styles.button}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
  },
});

export default HomeScreen;

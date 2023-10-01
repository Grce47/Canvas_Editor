import React from "react";
import { View, StyleSheet, Button } from "react-native";

export default function MyProject({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="My Projects"
        onPress={() =>
          navigation.navigate("CreateProject", {
            arr: [{ text: "def", x: 0, y: 0, w: 100, h: 100 }],
          })
        }
        style={styles.button}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

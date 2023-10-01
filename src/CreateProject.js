import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DraggedText from "./DraggableText";

const CreateProject = ({ route, navigation }) => {
  const [texts, settexts] = useState(route.params.arr);
  const [current_text, setcurrent_text] = useState("");

  const handleAddtext = () => {
    settexts([...texts, { text: current_text, x: 0, y: 0, w: 100, h: 100 }]);
    setcurrent_text("");
  };

  const handleSaveProject = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <DraggedText text={texts} settext={settexts} />
      <View style={styles.buttonContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Add Text"
          onChangeText={(newText) => setcurrent_text(newText)}
          defaultValue={current_text}
          onSubmitEditing={handleAddtext}
        />
        <Button title="Save Project" onPress={handleSaveProject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
});

export default CreateProject;

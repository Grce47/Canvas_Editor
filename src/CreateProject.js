import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DraggedText from "./DraggableText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TEXTS_KEY = "project_texts";
const CreateProject = ({ route, navigation }) => {
  // State variables
  const [database, setDatabase] = useState([]);
  const [project_id, setProjectId] = useState(route.params.project_id);
  const [texts, setTexts] = useState([]);
  const [current_text, setCurrentText] = useState("");

  useEffect(() => {
    // Load saved texts from AsyncStorage when the component mounts
    async function loadSavedTexts() {
      try {
        const savedTexts = await AsyncStorage.getItem(TEXTS_KEY);

        if (savedTexts) {
          setDatabase(() => {
            // Parse saved texts and update state
            const to_return = JSON.parse(savedTexts);
            setProjectId((prev) => {
              if (prev == -1 || prev == to_return.length)
                return to_return.length;
              setTexts(to_return[prev]);
              return prev;
            });
            return to_return;
          });
        }
      } catch (error) {
        console.error("Error loading texts:", error);
      }
    }
    loadSavedTexts();
  }, []);

  // Function to add a new text block
  const handleAddText = () => {
    setTexts((prev) => {
      if (prev.length === 0) {
        return [
          {
            text: current_text,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            project_id: project_id,
          },
        ];
      } else {
        return [
          ...prev,
          {
            text: current_text,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            project_id: project_id,
          },
        ];
      }
    });
    setCurrentText("");
  };

  // Function to save the project
  const handleSaveProject = () => {
    if (texts.length !== 0) {
      if (project_id == database.length) {
        // Save texts to AsyncStorage for a new project
        AsyncStorage.setItem(TEXTS_KEY, JSON.stringify([...database, texts]))
          .then(() => console.log("Texts saved successfully"))
          .catch((error) => console.error("Error saving texts:", error));
      } else {
        // Update existing project with modified texts
        AsyncStorage.setItem(
          TEXTS_KEY,
          JSON.stringify(
            database.map((val, idx) => {
              if (idx != project_id) return val;
              return texts;
            })
          )
        )
          .then(() => console.log("Texts saved successfully"))
          .catch((error) => console.error("Error saving texts:", error));
      }
    } else if (texts.length === 0 && project_id != database.length) {
      // Delete texts for an existing project
      AsyncStorage.setItem(
        TEXTS_KEY,
        JSON.stringify(
          database.filter((val, idx) => {
            if (idx != project_id) return true;
            return false;
          })
        )
      )
        .then(() => console.log("Texts saved successfully"))
        .catch((error) => console.error("Error saving texts:", error));
    }
    navigation.navigate("Home"); // Navigate back to the Home screen
  };

  return (
    <View style={styles.container}>
      <DraggedText text={texts} settext={setTexts} />
      <View style={styles.buttonContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Add Text"
          onChangeText={(newText) => setCurrentText(newText)}
          defaultValue={current_text}
          onSubmitEditing={handleAddText}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
});

export default CreateProject;

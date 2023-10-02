import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DraggedText from "./DraggableText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TEXTS_KEY = "project_texts"; // Define a storage key

const CreateProject = ({ route, navigation }) => {
  const [database, setdatabase] = useState([]);
  const [project_id, setproject_id] = useState(route.params.project_id);
  const [texts, settexts] = useState([]);
  const [current_text, setcurrent_text] = useState("");

  useEffect(() => {
    async function loadSavedTexts() {
      try {
        const savedTexts = await AsyncStorage.getItem(TEXTS_KEY);

        if (savedTexts) {
          setdatabase(() => {
            const to_return = JSON.parse(savedTexts);
            setproject_id((prev) => {
              if (prev == -1 || prev == to_return.length)
                return to_return.length;
              settexts(to_return[prev]);
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

  const handleAddtext = () => {
    settexts((prev) => {
      if (prev.length == 0) {
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
    setcurrent_text("");
  };

  const handleSaveProject = () => {
    if (texts.length != 0) {
      if (project_id == database.length) {
        AsyncStorage.setItem(TEXTS_KEY, JSON.stringify([...database, texts]))
          .then(() => console.log("Texts saved successfully"))
          .catch((error) => console.error("Error saving texts:", error));
      } else {
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
    } else if (texts.length == 0 && project_id != database.length) {
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

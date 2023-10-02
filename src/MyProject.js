import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TEXTS_KEY = "project_texts";

export default function MyProject({ navigation }) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    async function loadSavedTexts() {
      try {
        const savedTexts = await AsyncStorage.getItem(TEXTS_KEY);

        if (savedTexts) {
          setDatabase(JSON.parse(savedTexts));
        }
      } catch (error) {
        console.error("Error loading texts:", error);
      }
    }
    loadSavedTexts();
  }, []);

  const handleDeleteItem = async (itemIndex) => {
    try {
      // Remove the item from the database array
      const updatedDatabase = [...database];
      updatedDatabase.splice(itemIndex, 1);
      setDatabase(updatedDatabase);

      // Update AsyncStorage with the modified data
      await AsyncStorage.setItem(TEXTS_KEY, JSON.stringify(updatedDatabase));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={database}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].text}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="View"
                onPress={() =>
                  navigation.navigate("CreateProject", { project_id: index })
                }
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteItem(index)}
                color="red"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { DragResizeBlock } from "@skynetcmg47/react-native-drag-resize";

const DraggableText = ({ text, settext }) => {
  // State to manage blocks
  const [blocks, setBlocks] = useState(
    // Initialize blocks based on the provided text
    text.map((val, idx) => {
      return {
        key: idx,
        project_id: val.project_id,
        x: val.x,
        y: val.y,
        w: val.w,
        h: val.h,
        zIndex: idx,
        text: val.text,
        isDragEnabled: false,
      };
    })
  );

  useEffect(() => {
    // Update blocks when the text prop changes
    setBlocks(
      text.map((val, idx) => {
        return {
          key: idx,
          x: val.x,
          project_id: val.project_id,
          y: val.y,
          w: val.w,
          h: val.h,
          zIndex: idx,
          text: val.text,
          isDragEnabled: false,
        };
      })
    );
  }, [text]);

  // Function to toggle drag state of a block
  const toggleDragBlock = (key) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.key === key) {
        return {
          ...block,
          zIndex: Math.max(...blocks.map((b) => b.zIndex)) + 1,
          isDragEnabled: false,
        };
      }
      return block;
    });
    setBlocks(updatedBlocks);
  };

  // Function to handle block movement
  const handleBlockMove = (key, newX, newY) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.key === key) {
        return {
          ...block,
          x: newX[0],
          y: newX[1],
        };
      }
      return block;
    });
    setBlocks(updatedBlocks);
    const updatedText = updatedBlocks.map((val) => {
      return {
        text: val.text,
        x: val.x,
        y: val.y,
        w: val.w,
        project_id: val.project_id,
        h: val.h,
      };
    });
    settext(updatedText);
  };

  // Function to handle block resizing
  const handleBlockResize = (key, newX, newY, newW, newH) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.key === key) {
        return {
          ...block,
          w: newX[2],
          h: newX[3],
        };
      }
      return block;
    });
    setBlocks(updatedBlocks);
    const updatedText = updatedBlocks.map((val) => {
      return {
        text: val.text,
        x: val.x,
        y: val.y,
        project_id: val.project_id,
        w: val.w,
        h: val.h,
      };
    });
    settext(updatedText);
  };

  // Function to delete a block
  const deleteBlock = (key) => {
    const updatedBlocks = blocks.filter((block) => block.key !== key);
    setBlocks(updatedBlocks);
    const updatedText = updatedBlocks.map((val) => {
      return {
        text: val.text,
        x: val.x,
        project_id: val.project_id,
        y: val.y,
        w: val.w,
        h: val.h,
      };
    });
    settext(updatedText);
  };

  // Function to calculate font size dynamically based on container dimensions and text length
  const calcFontSize = (block) => {
    const containerWidth = block.w;
    const containerHeight = block.h;
    const textLength = block.text.length;
    const fontSize = Math.min(containerWidth, containerHeight) / textLength;
    return fontSize;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // Enable dragging for all blocks on press
        const updatedBlocks = blocks.map((block) => ({
          ...block,
          zIndex: 0,
          isDragEnabled: true,
        }));
        setBlocks(updatedBlocks);
      }}
      activeOpacity={1}
    >
      {blocks.map((block) => (
        <DragResizeBlock
          key={block.key}
          x={block.x}
          y={block.y}
          w={block.w}
          h={block.h}
          zIndex={block.zIndex}
          isDisabled={block.isDragEnabled}
          onDrag={(x, y) => handleBlockMove(block.key, x, y)}
          onResizeEnd={(x, y, w, h) => handleBlockResize(block.key, x, y, w, h)}
        >
          <View
            style={[
              styles.innerContainer,
              { backgroundColor: block.isDragEnabled ? "white" : "lightgrey" },
            ]}
          >
            <Text
              style={[styles.text, { fontSize: calcFontSize(block) }]}
              onPress={() => {
                toggleDragBlock(block.key);
              }}
              activeOpacity={1}
            >
              {block.text}
            </Text>
            {!block.isDragEnabled && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  deleteBlock(block.key);
                }}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </DragResizeBlock>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  text: {
    textAlign: "center",
  },
});

export default DraggableText;

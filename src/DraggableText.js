// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { DragResizeBlock } from "@skynetcmg47/react-native-drag-resize";

// const DraggableText = ({ text, settext }) => {
//   const [blocks, setBlocks] = useState(
//     text.map((val, idx) => {
//       return {
//         key: idx,
//         project_id: val.project_id,
//         x: val.x,
//         y: val.y,
//         w: val.w,
//         h: val.h,
//         zIndex: idx,
//         text: val.text,
//         isDragEnabled: false,
//       };
//     })
//   );

//   useEffect(() => {
//     setBlocks(
//       text.map((val, idx) => {
//         return {
//           key: idx,
//           x: val.x,
//           project_id: val.project_id,
//           y: val.y,
//           w: val.w,
//           h: val.h,
//           zIndex: idx,
//           text: val.text,
//           isDragEnabled: false,
//         };
//       })
//     );
//   }, [text]);

//   // const calc_font_size = (block) => {
//   //   return Math.min(block.h, block.w) / 6;
//   // };
//   const toggleDragBlock = (key) => {
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         // Bring the clicked block to the top by setting its zIndex to the highest value
//         return {
//           ...block,
//           zIndex: Math.max(...blocks.map((b) => b.zIndex)) + 1,
//           isDragEnabled: false,
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//   };
//   const handleBlockMove = (key, newX, newY) => {
//     // Update the x and y values of the moved block in the blocks state
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         return {
//           ...block,
//           x: newX[0],
//           y: newX[1],
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//     const updatedtext = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         y: val.y,
//         w: val.w,
//         project_id: val.project_id,
//         h: val.h,
//       };
//     });
//     settext(updatedtext);
//   };
//   const handleBlockResize = (key, newX, newY, newW, newH) => {
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         return {
//           ...block,
//           w: newX[2],
//           h: newX[3],
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//     const updatedtext = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         y: val.y,
//         project_id: val.project_id,
//         w: val.w,
//         h: val.h,
//       };
//     });
//     settext(updatedtext);
//   };
//   const deleteBlock = (key) => {
//     const updatedBlocks = blocks.filter((block) => block.key !== key);
//     setBlocks(updatedBlocks);
//     const updatedtext = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         project_id: val.project_id,
//         y: val.y,
//         w: val.w,
//         h: val.h,
//       };
//     });
//     settext(updatedtext);
//   };
//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => {
//         const updatedBlocks = blocks.map((block) => ({
//           ...block,
//           zIndex: 0,
//           isDragEnabled: true,
//         }));
//         setBlocks(updatedBlocks);
//       }}
//       activeOpacity={1} // To prevent TouchableOpacity from capturing touch events
//     >
//       {blocks.map((block) => (
//         <DragResizeBlock
//           key={block.key}
//           x={block.x}
//           y={block.y}
//           w={block.w}
//           h={block.h}
//           zIndex={block.zIndex}
//           isDisabled={block.isDragEnabled}
//           onDrag={(x, y) => handleBlockMove(block.key, x, y)}
//           onResizeEnd={(x, y, w, h) => handleBlockResize(block.key, x, y, w, h)}
//         >
//           <View
//             style={[
//               styles.innerContainer,
//               { backgroundColor: block.isDragEnabled ? "white" : "lightgrey" },
//             ]}
//           >
//             <Text
//               style={styles.text}
//               onPress={() => {
//                 toggleDragBlock(block.key);
//               }}
//               activeOpacity={1} // To prevent Text from capturing touch events
//             >
//               {block.text}
//             </Text>
//             {!block.isDragEnabled && (
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => {
//                   deleteBlock(block.key);
//                 }}
//               >
//                 <Text style={styles.deleteButtonText}>Delete</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </DragResizeBlock>
//       ))}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white", // Background color of the View
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     backgroundColor: "red",
//     padding: 5,
//     borderRadius: 5,
//   },
//   deleteButtonText: {
//     color: "white",
//   },
//   text: {
//     // fontSize: 18,
//     textAlign: "center",
//     padding: 20,
//   },
// });

// export default DraggableText;


// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
// import { DragResizeBlock } from "@skynetcmg47/react-native-drag-resize";

// const DraggableText = ({ text, settext }) => {
//   const [blocks, setBlocks] = useState(
//     text.map((val, idx) => {
//       return {
//         key: idx,
//         project_id: val.project_id,
//         x: val.x,
//         y: val.y,
//         w: val.w,
//         h: val.h,
//         zIndex: idx,
//         text: val.text,
//         isDragEnabled: false,
//       };
//     })
//   );

//   useEffect(() => {
//     setBlocks(
//       text.map((val, idx) => {
//         return {
//           key: idx,
//           x: val.x,
//           project_id: val.project_id,
//           y: val.y,
//           w: val.w,
//           h: val.h,
//           zIndex: idx,
//           text: val.text,
//           isDragEnabled: false,
//         };
//       })
//     );
//   }, [text]);

//   const toggleDragBlock = (key) => {
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         return {
//           ...block,
//           zIndex: Math.max(...blocks.map((b) => b.zIndex)) + 1,
//           isDragEnabled: false,
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//   };

//   const handleBlockMove = (key, newX, newY) => {
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         return {
//           ...block,
//           x: newX[0],
//           y: newX[1],
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//     const updatedText = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         y: val.y,
//         w: val.w,
//         project_id: val.project_id,
//         h: val.h,
//       };
//     });
//     settext(updatedText);
//   };

//   const handleBlockResize = (key, newX, newY, newW, newH) => {
//     const updatedBlocks = blocks.map((block) => {
//       if (block.key === key) {
//         return {
//           ...block,
//           w: newX[2],
//           h: newX[3],
//         };
//       }
//       return block;
//     });
//     setBlocks(updatedBlocks);
//     const updatedText = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         y: val.y,
//         project_id: val.project_id,
//         w: val.w,
//         h: val.h,
//       };
//     });
//     settext(updatedText);
//   };

//   const deleteBlock = (key) => {
//     const updatedBlocks = blocks.filter((block) => block.key !== key);
//     setBlocks(updatedBlocks);
//     const updatedText = updatedBlocks.map((val) => {
//       return {
//         text: val.text,
//         x: val.x,
//         project_id: val.project_id,
//         y: val.y,
//         w: val.w,
//         h: val.h,
//       };
//     });
//     settext(updatedText);
//   };

//   const calcFontSize = (block) => {
//     // Calculate a dynamic font size based on container dimensions and text length
//     const containerWidth = block.w;
//     const containerHeight = block.h;
//     const textLength = block.text.length;
//     const fontSize = Math.min(containerWidth, containerHeight) / textLength;
//     return fontSize;
//   };

//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => {
//         const updatedBlocks = blocks.map((block) => ({
//           ...block,
//           zIndex: 0,
//           isDragEnabled: true,
//         }));
//         setBlocks(updatedBlocks);
//       }}
//       activeOpacity={1}
//     >
//       {blocks.map((block) => (
//         <DragResizeBlock
//           key={block.key}
//           x={block.x}
//           y={block.y}
//           w={block.w}
//           h={block.h}
//           zIndex={block.zIndex}
//           isDisabled={block.isDragEnabled}
//           onDrag={(x, y) => handleBlockMove(block.key, x, y)}
//           onResizeEnd={(x, y, w, h) => handleBlockResize(block.key, x, y, w, h)}
//         >
//           <View
//             style={[
//               styles.innerContainer,
//               { backgroundColor: block.isDragEnabled ? "white" : "lightgrey" },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.text,
//                 { fontSize: calcFontSize(block) },
//               ]}
//               onPress={() => {
//                 toggleDragBlock(block.key);
//               }}
//               activeOpacity={1}
//             >
//               {block.text}
//             </Text>
//             {!block.isDragEnabled && (
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => {
//                   deleteBlock(block.key);
//                 }}
//               >
//                 <Text style={styles.deleteButtonText}>Delete</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </DragResizeBlock>
//       ))}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     backgroundColor: "red",
//     padding: 5,
//     borderRadius: 5,
//   },
//   deleteButtonText: {
//     color: "white",
//   },
//   text: {
//     textAlign: "center",
//     padding: 20,
//   },
// });

// export default DraggableText;


import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { DragResizeBlock } from "@skynetcmg47/react-native-drag-resize";

const DraggableText = ({ text, settext }) => {
  const [blocks, setBlocks] = useState(
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

  const calcFontSize = (block) => {
    // Calculate a dynamic font size based on container dimensions and text length
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
              style={[
                styles.text,
                { fontSize: calcFontSize(block) },
              ]}
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

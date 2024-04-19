import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import _ from "lodash";

export const WhiteboardLayout = () => {
  // Initialize state to hold the excalidrawElements and files
  const [elements, setElements] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);

  // Function to handle the change event with debouncing
  const handleChangeDebounced = _.debounce(
    (excalidrawElements, appState, files) => {
      // Update the elements state with the new excalidrawElements
      setElements(excalidrawElements);

      // Store the elements array in local storage
      localStorage.setItem(
        "excalidrawElements",
        JSON.stringify(excalidrawElements)
      );

      // Store the files array in local storage
      localStorage.setItem("excalidrawFiles", JSON.stringify(files));

      // Update the savedFiles state with the new files
      setSavedFiles(files);
    },
    2000
  ); // Debounce for 2 seconds (2000 milliseconds)

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("excalidrawElements")) || []);
    console.log(JSON.parse(localStorage.getItem("excalidrawFiles")) || []);
  }, []);

  return (
    <div className="w-full h-full custom-styles">
      <style>
        {`
          .excalidraw-text {
            font-family: 'Arial', sans-serif; /* Change the font family here */
          }
        `}
      </style>
      <Excalidraw
        onChange={handleChangeDebounced}
        theme="light"
        initialData={{
          appState: {
            zenModeEnabled: false,
            viewBackgroundColor: "#0d1117",
            currentItemStrokeColor: "#fff",
          },
          scrollToContent: true,
          elements:
            JSON.parse(localStorage.getItem("excalidrawElements")) || [],
          files: JSON.parse(localStorage.getItem("excalidrawFiles")) || [],
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.SaveAsImage />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

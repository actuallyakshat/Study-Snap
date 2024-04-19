import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

export const WhiteboardLayout = () => {
  // Initialize state to hold the excalidrawElements and files
  const [elements, setElements] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);

  // Function to handle the change event
  const handleChange = (excalidrawElements, appState, files) => {
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
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("excalidrawElements")) || []);
    console.log(JSON.parse(localStorage.getItem("excalidrawFiles")) || []);
  }, []);

  return (
    <div className="w-full h-full custom-styles">
      <Excalidraw
        onChange={handleChange}
        theme="light"
        initialData={{
          appState: {
            zenModeEnabled: true,
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

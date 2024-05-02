import { useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import _ from "lodash";

export const WhiteboardLayout = () => {
  // Initialize state to hold the excalidrawElements and files
  const [elements, setElements] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);

  const handleChangeDebounced = _.debounce(
    (excalidrawElements, appState, files) => {
      setElements(excalidrawElements);
      localStorage.setItem(
        "excalidrawElements",
        JSON.stringify(excalidrawElements)
      );
      localStorage.setItem("excalidrawFiles", JSON.stringify(files));
      setSavedFiles(files);
    },
    100
  );

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

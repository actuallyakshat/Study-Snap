import { useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import _ from "lodash";

export const WhiteboardLayout = () => {
  // Initialize state to hold the excalidrawElements and files
  const [elements, setElements] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);

  // Function to handle the change event with debouncing
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
    300
  ); // Debounce for 2 seconds (2000 milliseconds)

  return (
    <div className="w-full h-full custom-styles">
      <Excalidraw
        onChange={handleChangeDebounced}
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

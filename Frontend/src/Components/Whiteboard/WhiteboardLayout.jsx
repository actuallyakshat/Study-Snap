import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
export const WhiteboardLayout = () => {
  return (
    <div className="w-full h-full custom-styles">
      <Excalidraw
        onChange={() => {
          console.log("Change");
        }}
        theme="light"
        initialData={{
          appState: {
            zenModeEnabled: true,
            viewBackgroundColor: "#0d1117",
            currentItemStrokeColor: "#fff",
          },
          scrollToContent: true,
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
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

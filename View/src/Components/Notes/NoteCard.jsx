import { sidebarOpenAtom } from "../../Utils/Store";
import { useSetAtom } from "jotai";
export const NoteCard = ({ note, isSelected, onSelect }) => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const selectionHandler = () => {
    onSelect();
    setSidebarOpen(false);
  };
  const date = new Date(note.dateCreated);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  function parseHTMLToText(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    function extractText(node) {
      let text = "";

      switch (node.nodeType) {
        case Node.TEXT_NODE:
          text += node.textContent.trim();
          break;
        case Node.ELEMENT_NODE:
          if (
            node.tagName.toLowerCase() === "ol" ||
            node.tagName.toLowerCase() === "ul"
          ) {
            const items = Array.from(node.querySelectorAll("li"))
              .map((li) => extractText(li))
              .join(", ");
            text += items;
          } else {
            Array.from(node.childNodes).forEach((child, index) => {
              text += extractText(child);
              // Add space between different elements
              if (index < node.childNodes.length - 1) {
                text += " ";
              }
            });
          }
          break;
        default:
          break;
      }

      return text;
    }

    return extractText(doc.body);
  }

  return (
    <div
      onClick={selectionHandler}
      className={`${
        isSelected ? "bg-white/40" : "bg-white/5 hover:bg-black/40"
      } w-full min-h-[5rem] space-y-1 cursor-pointer transition-colors rounded-lg p-3 flex flex-col justify-center`}
    >
      <div className="w-full flex justify-between">
        <h1 className="font-semibold">{note.title}</h1>
        <p>{formattedDate}</p>
      </div>
      <p className="truncate">{parseHTMLToText(note.content)}</p>
    </div>
  );
};

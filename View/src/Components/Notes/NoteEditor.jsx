import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";

const extensions = [
  StarterKit,
  Underline,
  ListItem,
  OrderedList,
  BulletList,
  Heading.configure({
    levels: [1, 2],
  }),
];

import { FaBold } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { useEffect, useState } from "react";

export const NoteEditor = ({ content }) => {
  const [editorContent, setEditorContent] = useState(content);
  const editor = useEditor({
    extensions,
    content: editorContent,
    editorProps: {
      attributes: {
        class: "rounded-md focus:outline-none my-4",
      },
    },
  });

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  if (!editor) return null;

  const handleEditorContent = () => {
    const html = editor.getHTML();
    console.log(html);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="bg-white/20 rounded-md justify-center flex gap-1 items-center">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive("italic")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${
              editor.isActive("underline")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <FaUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`${
              editor.isActive("strike")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            toggleOrderedList
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            toggleBulletList
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>
        </div>
        <div className="space-x-4">
          <button onClick={handleEditorContent}>
            <FaSave className="size-5 hover:text-gray-300 transition-colors" />
          </button>
          <button>
            <FaTrash className="size-5 hover:text-gray-300 transition-colors" />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

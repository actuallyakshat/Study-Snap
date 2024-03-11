import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
<script src="https://cdn.tailwindcss.com?plugins=typography"></script>;
const extensions = [
  StarterKit,
  Underline,
  ListItem,
  OrderedList,
  BulletList,
  Heading,
];

import { FaBold } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoListOutline } from "react-icons/io5";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { LuHeading4 } from "react-icons/lu";
import { FaListOl } from "react-icons/fa6";

export const NoteEditor = ({ content }) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions,
    content: editorContent,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none min-w-full mt-6",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const handleEditorContent = () => {
    const html = editor.getHTML();
    console.log(html);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col xl:flex-row gap-3 justify-between">
        <div className="bg-white/20 px-3 w-fit flex-wrap rounded-md flex gap-2 items-center">
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
            className={`${
              editor.isActive("orderedList")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${
              editor.isActive("bulletList")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <IoListOutline className="size-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <LuHeading1 className="size-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <LuHeading2 className="size-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <LuHeading3 className="size-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 4 })
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } p-2 rounded-md transition-colors`}
          >
            <LuHeading4 className="size-5" />
          </button>
        </div>
        <div className="flex gap-3 items-start">
          <button
            className="flex items-center bg-white/20 px-4 hover:bg-green-500/20 transition-colors rounded-md py-2 text-sm gap-3"
            onClick={handleEditorContent}
          >
            <p>Save</p>
            <FaSave className="size-5 hover:text-gray-300 transition-colors" />
          </button>
          <button className="flex items-center bg-white/20 hover:bg-red-500/40 transition-colors rounded-md py-2 text-sm gap-3 px-4">
            <p>Delete</p>
            <FaTrash className="size-5 hover:text-gray-300  transition-colors" />
          </button>
        </div>
      </div>
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

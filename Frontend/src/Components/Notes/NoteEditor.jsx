import "./editorstyles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
<script src="https://cdn.tailwindcss.com?plugins=typography"></script>;

import { FaBold } from "react-icons/fa";
import { RiTaskFill } from "react-icons/ri";
import { FaStrikethrough } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoListOutline } from "react-icons/io5";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { LuHeading4 } from "react-icons/lu";
import { FaListOl } from "react-icons/fa6";
import { NoteDeletionModal } from "./NoteDeletionModal";
import { clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
import { saveNote } from "../../HandleApi/NotesApiHandler";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const NoteEditor = ({ content, noteId, setSelectedNoteId, title }) => {
  const extensions = [
    StarterKit,
    Underline,
    ListItem,
    OrderedList,
    BulletList,
    Heading,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ];

  const [editorContent, setEditorContent] = useState(content);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [user, setUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useState(false);

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
      const handleKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          handleSaveNote();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
      editor.commands.focus();
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor, noteId]);

  if (!editor) return null;

  const handleSaveNote = async () => {
    setLoading(true);
    const currentContent = editor.getHTML();
    const response = await saveNote(noteId, title, currentContent, user.email);
    setLoading(false);
    if (response.success) {
      toast.success("File saved successfully");
    }
    const updatedUser = { ...user };
    updatedUser.folders.forEach((folder) => {
      folder.notes.forEach((note) => {
        if (note._id === noteId) {
          note.title = title;
          note.content = currentContent;
        }
      });
    });
    setUser(updatedUser);
  };

  return (
    <div className="w-full">
      <NoteDeletionModal
        deleteNoteModal={deleteNoteModal}
        setDeleteNoteModal={setDeleteNoteModal}
        noteId={noteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      <div className="flex w-full flex-col justify-between gap-3 xl:flex-row">
        <div className="flex w-fit flex-wrap items-center gap-2 rounded-md bg-white/20 px-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
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
            } rounded-md p-2 transition-colors`}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${
              editor.isActive("underline")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
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
            } rounded-md p-2 transition-colors`}
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${
              editor.isActive("orderedList")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${
              editor.isActive("bulletList")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
          >
            <IoListOutline className="size-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`${
              editor.isActive("taskList")
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
          >
            <RiTaskFill />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-300/30"
                : "hover:bg-gray-200/10"
            } rounded-md p-2 transition-colors`}
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
            } rounded-md p-2 transition-colors`}
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
            } rounded-md p-2 transition-colors`}
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
            } rounded-md p-2 transition-colors`}
          >
            <LuHeading4 className="size-5" />
          </button>
        </div>
        {loading ? (
          <div className="mr-4">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex items-stretch gap-3 ">
            <button
              className="flex items-center gap-3 rounded-md bg-white/20 px-4 py-2 text-sm transition-colors hover:bg-green-500/20"
              onClick={handleSaveNote}
            >
              <p>Save</p>
              <FaSave className="size-5 transition-colors hover:text-gray-300" />
            </button>
            <button
              onClick={() => setDeleteNoteModal(true)}
              className="flex items-center gap-3 rounded-md bg-white/20 px-4 py-2 text-sm transition-colors hover:bg-red-500/40"
            >
              <p>Delete</p>
              <FaTrash className="size-5 transition-colors  hover:text-gray-300" />
            </button>
          </div>
        )}
      </div>
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

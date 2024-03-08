import { useEffect, useState } from "react";
import { NoteEditor } from "./NoteEditor";

export const Note = ({ note }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  console.log(note.content);

  return (
    <div>
      <div className="mx-auto mt-20 max-w-[60%]">
        <input
          type="text"
          placeholder="Heading"
          value={title}
          onChange={handleTitleChange}
          className="bg-transparent focus:outline-none text-5xl font-bold"
        />
        <div className="mt-6">
          <NoteEditor content={content} />
        </div>
      </div>
    </div>
  );
};

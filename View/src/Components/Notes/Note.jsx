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

  return (
    <div>
      <div className="mx-auto pt-20 pb-10 px-6 md:max-w-[75%]">
        <input
          type="text"
          placeholder="Heading"
          value={title}
          onChange={handleTitleChange}
          className="bg-transparent w-full max-w-[15ch] focus:outline-none text-5xl font-bold sm:max-w-full sm:break-all"
        />
        <div className="mt-6 w-full">
          <NoteEditor content={content} />
        </div>
      </div>
    </div>
  );
};

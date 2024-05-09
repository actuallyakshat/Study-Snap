import { useEffect, useState } from "react";
import { NoteEditor } from "./NoteEditor";

export const Note = ({ note, setSelectedNoteId }) => {
  
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
  }, [note]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  if(!note) return;

  return (
    <div>
      <div className="mx-auto px-6 py-8 md:max-w-[75%] md:pb-10 md:pt-20">
        <input
          type="text"
          placeholder="Heading"
          value={title}
          onChange={handleTitleChange}
          className="w-full max-w-[15ch] bg-transparent text-5xl font-bold focus:outline-none sm:max-w-full sm:break-all"
        />
        <div className="mt-6 w-full">
          <NoteEditor
            title={title}
            setSelectedNoteId={setSelectedNoteId}
            content={content}
            noteId={note._id}
          />
        </div>
      </div>
    </div>
  );
};

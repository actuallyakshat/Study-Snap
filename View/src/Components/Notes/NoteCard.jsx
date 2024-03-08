export const NoteCard = ({ note, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`${
        isSelected ? "bg-white/40" : "bg-white/5 hover:bg-black/40"
      } w-full min-h-[5rem] space-y-1 cursor-pointer transition-colors rounded-lg p-3 flex flex-col justify-center`}
    >
      <div className="w-full flex justify-between">
        <h1 className="font-semibold">{note.title}</h1>
        <p>{note.dateCreated}</p>
      </div>
      <p className="truncate">{note.content}</p>
    </div>
  );
};

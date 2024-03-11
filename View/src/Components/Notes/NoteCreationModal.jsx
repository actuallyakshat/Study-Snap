import { useForm } from "react-hook-form";
const folders = [
  { id: 1, name: "Personal" },
  { id: 2, name: "Work" },
  { id: 3, name: "Ideas" },
];
export const NoteCreationModal = ({ setAddNoteModel, addNoteModel }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setAddNoteModel(false);
    console.log(data);
    reset();
  };
  return (
    <>
      {addNoteModel && (
        <div
          onClick={() => setAddNoteModel(false)}
          className="popup-overlay w-full h-full z-[11] top-0 backdrop-blur-sm absolute"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content max-w-[30em] w-full px-4 py-10 rounded-lg border border-gray-500/40 absolute bg-[#0d1117] shadow-lg shadow-gray-800/20 z-[11] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-3xl mb-4 font-bold text-center">
              Add New Note
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto space-y-3 max-w-[80%]"
            >
              <div className="space-y-1">
                <label htmlFor="title" className="block font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full rounded-lg py-1 text-black px-2 font-medium focus:ring-2 focus:outline-none focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="folder" className="block font-medium">
                  Choose a folder:
                </label>
                <select
                  {...register("folder")}
                  id="folder"
                  className="text-black w-full font-medium rounded-lg px-1 py-1 focus:ring-2 focus:outline-none focus:ring-blue-600"
                >
                  <option className="font-medium" value="">
                    None
                  </option>
                  {folders.map((folder) => (
                    <option
                      key={folder._id}
                      value={folder._id}
                      className="text-black font-medium"
                    >
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="gap-2 mt-6 flex justify-end">
                <button className="bg-primaryPurple px-3 py-2 rounded-md text-sm">
                  Add Note
                </button>
                <button
                  onClick={() => setAddNoteModel(false)}
                  className="bg-red-600 px-3 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

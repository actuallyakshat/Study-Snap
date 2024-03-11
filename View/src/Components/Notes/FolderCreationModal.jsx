import { useForm } from "react-hook-form";
export const FolderCreationModal = ({ addFolderModal, setAddFolderModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setAddFolderModal(false);
    console.log(data);
    reset();
  };
  return (
    <>
      {addFolderModal && (
        <div
          onClick={() => setAddFolderModal(false)}
          className="popup-overlay w-full h-full z-[11] top-0 backdrop-blur-sm absolute"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content max-w-[30em] w-full px-4 py-10 rounded-lg border border-gray-500/40 absolute bg-[#0d1117] shadow-lg shadow-gray-800/20 z-[11] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-3xl mb-4 font-bold text-center">
              Add New Folder
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
            </form>
            <div className="max-w-[80%] mx-auto gap-2 mt-6 flex justify-end">
              <button className="bg-primaryPurple px-3 py-2 rounded-md text-sm">
                Add Folder
              </button>
              <button
                onClick={() => setAddFolderModal(false)}
                className="bg-red-600 px-3 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

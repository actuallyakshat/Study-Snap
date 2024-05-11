export default function ViewImageModal({ setViewImageModal, imageUrl }) {
  return (
    <div
      className="popup-overlay fixed left-0 top-0 z-[11] flex h-full w-full items-center justify-center backdrop-blur-sm"
      onClick={() => setViewImageModal(false)}
    >
      <img
        src={imageUrl}
        onClick={(e) => e.stopPropagation()}
        className="popup-content aspect-square max-w-lg overflow-hidden rounded-lg object-cover px-4"
      />
    </div>
  );
}

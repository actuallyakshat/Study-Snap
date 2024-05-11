export default function ConfirmCancelModal({ onClose, onCancel }) {
  return (
    <div className="fixed inset-0 z-[52] flex flex-col items-center justify-center bg-black/90">
      <h1 className="text-4xl font-bold text-white">Are you sure?</h1>
      <h3 className="text-xl">You are about to cancel your changes.</h3>
      <div className="mt-4 flex gap-3">
        <button className="btn" onClick={onCancel}>
          Go back
        </button>
        <button className="btn" onClick={onClose}>
          Yes. Cancel my changes
        </button>
      </div>
    </div>
  );
}

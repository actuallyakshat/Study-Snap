export default function EditProfileModal({ onClose }) {
  return (
    <div onClick={onClose} className="popup-overlay fixed inset-0 z-[51]">
      <div className="popup-content container mx-auto mt-14">Edit Profile</div>
    </div>
  );
}

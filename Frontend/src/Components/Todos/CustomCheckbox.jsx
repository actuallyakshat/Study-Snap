const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "4px",
        backgroundColor: checked ? "#7f007f" : "#d8d8d8",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          style={{ fill: "#fff" }}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M9 16.2l-3.5-3.5L4 14l5 5 11-11-1.4-1.4L9 16.2z" />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;

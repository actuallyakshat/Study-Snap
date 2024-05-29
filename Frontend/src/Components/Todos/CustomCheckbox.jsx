const CustomCheckbox = ({ checked, onChange, size }) => {
  const checkboxSize = size == "lg" ? "15px" : "12px";
  const checkSize = size == "lg" ? "14px" : "12px";
  return (
    <div
      onClick={onChange}
      style={{
        width: checkboxSize,
        height: checkboxSize,
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
          width={checkSize}
          height={checkSize}
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

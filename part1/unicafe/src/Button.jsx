export const Button = ({ value, setValue, label }) => {
  const handleOnClick = () => {
    setValue(value + 1);
  };
  return (
    <button type="button" onClick={handleOnClick}>
      {label}
    </button>
  );
};

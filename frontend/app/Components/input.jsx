function Input({
  placeholder,
  field,
  label,
  span,
  value = "Value not passed",
  handleChange,
  color="blue"
}) {
  let colSpan;
  switch (span) {
    case 1:
      colSpan = "col-span-1";
      break;
    case 2:
      colSpan = "col-span-2";
      break;
    case 3:
      colSpan = "col-span-3";
      break;
    case 4:
      colSpan = "col-span-4";
      break;
    case 5:
      colSpan = "col-span-5";
      break;
    case 6:
      colSpan = "col-span-6";
      break;
    default:
      colSpan = "col-span-6";
  }

  return (
    <div className={`${colSpan}  flex flex-col`}>
      <label className={`${color == "blue" ? " text-blue" :" text-[#7C838A] text-opacity-60"} font-poppin-medium text-lg`} htmlFor={field}>
        {label}
      </label>
      <input
        type="text"
        className={`rounded-2xl h-10 sm:h-12 bg-opacity-40 w-full bg-input-background active:border-0 outline-none
        px-6 py-2
        `}
        id={field}
        onChange={handleChange}
        value={value}
        name={field}
        placeholder={placeholder || "Add  Your Placeholder"}
      />
    </div>
  );
}

export default Input;

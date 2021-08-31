const Input = ({
  elementType,
  value,
  options,
  onchange,
  label,
  blur,
  isValid,
  onblur,
  type,
  required,
}) => {
  let inputClasses = ["form-input"];
  if (blur && !isValid) {
    inputClasses.push("form-invalid");
  }
  let inputElement;
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={value}
          onChange={onchange}
          name={label}
          onBlur={onblur}
          type={type}
          required={required}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          id="textarea"
          required={required}
          value={value}
          onChange={onchange}
          name={label}
          className={inputClasses.join(" ")}
          onBlur={onblur}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select
          value={value}
          onChange={onchange}
          className={inputClasses.join(" ")}
          required={required}
          onBlur={onblur}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={value}
          onChange={onchange}
          name={label}
          onBlur={onblur}
          required={required}
        />
      );
      break;
  }

  return (
    <div className="form-group">
      <label className="form-label">{label}:</label>
      {inputElement}
    </div>
  );
};

export default Input;

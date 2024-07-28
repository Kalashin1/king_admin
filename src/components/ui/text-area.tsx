import { InputProps } from "./input";

const TextArea = ({
  hasLabel,
  id,
  label,
  defaultValue,
  onChange,
  disabled,
  readonly,
  required,
  name,
  extraClass,
  rows = 4,
}: Partial<InputProps> & {
  rows?: number;
}) => {
  return (
    <div className="my-2">
      {hasLabel && (
        <label htmlFor={id} className="text-sm my-2">
          {label}
        </label>
      )}

      <textarea
        defaultValue={defaultValue}
        onChange={onChange}
        className={`border-gray-300 px-4 py-2 outline-none border rounded-md w-full ${extraClass}`}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        name={name}
        rows={rows}
        id={id}
      ></textarea>
    </div>
  );
};

export default TextArea;

import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

const Input = ({
  id,
  type,
  name,
  placeholder,
  label,
  onChange,
  defaultValue,
  extraClass,
  hasIcon,
  hasLabel,
  icon,
  iconClickHandler,
  iconHasHandler = false,
  disabled,
}: Partial<InputProps>) => {
  return (
    <div
      className={`border mb-4 py-2 px-3 rounded-md border-gray-300 ${extraClass}`}
    >
      {hasLabel && (
        <label htmlFor={id} className="text-sm my-2">
          {label}
        </label>
      )}
      <div className="flex items-center">
        {hasIcon && (
          <span
            onClick={iconClickHandler}
            className={`${
              iconHasHandler ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {typeof icon === "string" ? <i className={`${icon}`} /> : icon}
          </span>
        )}
        <input
          id={id}
          className={`pl-2 w-full bg-transparent outline-none focus-within:bg-transparent `}
          type={type}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
export type InputProps = {
  hasIcon: boolean;
  icon: string | JSX.Element;
  iconHasHandler: boolean;
  iconClickHandler: (...args: unknown[]) => void;
  extraClass: string;
  placeholder: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  defaultValue: string;
  value: string | number;
  id: string;
  type: HTMLInputTypeAttribute;
  disabled: boolean;
  required: boolean;
  name: string;
  readonly: boolean;
  pattern?: string;
  hasLabel: boolean;
};

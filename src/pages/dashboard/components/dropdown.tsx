import { FC, ReactNode } from "react";

export type DropdownProps = {
  children: ReactNode;
};

export const Dropdown: FC<DropdownProps> = ({ children }) => (
  <div>
    <div className="popper-box rounded-md border border-slate-150 dark:bg-navy-900 text-gray-900 dark:text-white py-1.5 font-inter dark:border-navy-500 bg-white max:w-200">
      {children}
    </div>
  </div>
);

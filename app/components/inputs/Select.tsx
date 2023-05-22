"use client";
import ReactSelect from "react-select";
interface ISelect {
  label: string;
  value?: Record<string, any>;
  disabled?: boolean;
  options: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
}
const Select = ({ onChange, disabled, value, options, label }: ISelect) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium text-gray-900 leading-6">
        {label}
      </label>
      <div className="mt-2 ">
        <ReactSelect
          options={options}
          isLoading={disabled}
          isDisabled={disabled}
          isMulti
          onChange={onChange}
          menuPortalTarget={document.body}
          value={value}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;

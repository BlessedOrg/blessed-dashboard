import Select, { components } from "react-select";
import React, { useEffect, useRef, useState } from "react";

const { MenuList, Control, Option } = components;

interface IProps {
  name?: "string";
  onChange: (data: any) => void;
  options: any[];
  defaultValue?: any;
  icon?: any;
  placeholder: string;
  isDisabled?: boolean;
  countryRef?: any;
  value: any;
}

export const LocationSelect = ({
  onChange,
  options,
  icon,
  placeholder,
  isDisabled = true,
  value
}: IProps) => {
  const locationSelectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeMenuOnClickOutside = (event) => {
      if (locationSelectRef.current && !locationSelectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);
    return () => document.removeEventListener("click", closeMenuOnClickOutside);
  }, []);

  return (
    <div ref={locationSelectRef} className="w-full h-full">
      <Select
        isDisabled={isDisabled}
        menuIsOpen={isOpen}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        onChange={onChange}
        value={value}
        options={options}
        defaultValue={value}
        //@ts-ignore
        icon={icon}
        placeholder={placeholder}
      />
    </div>
  );
};

const CustomOption = (props) => (
  <Option {...props}>
    <FormatOptionLabel {...props.data} isSelected={props.isSelected} />
  </Option>
);

const FormatOptionLabel = ({ label, flag, isSelected }) => (
  <div
    className={`
      flex items-center gap-3 py-2.5 px-4 cursor-pointer border-b border-gray-100
      ${isSelected ? "bg-gray-50" : "bg-white"}
      hover:bg-gray-50/80 transition-all duration-200 ease-in-out
    `}
  >
    {flag && <span className="flex-shrink-0">{flag}</span>}
    <span className="text-sm font-medium text-gray-700 truncate">
      {label}
    </span>
  </div>
);

const CustomMenuList = (props) => {
  const { selectProps } = props;
  const { onInputChange, inputValue, onMenuInputFocus } = selectProps;

  return (
    <MenuList {...props}>
      <div className="flex flex-col">
        <div className="sticky top-0 bg-white shadow-sm z-10">
          <div className="flex items-center px-3 border-b border-gray-100">
            <input
              type="text"
              className="w-full py-3 px-1 text-sm placeholder:text-gray-400 focus:outline-none"
              placeholder="Search location..."
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value, { action: "input-change" })}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.currentTarget.focus();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.currentTarget.focus();
              }}
              onFocus={onMenuInputFocus}
            />
          </div>
        </div>
        {props.children}
      </div>
    </MenuList>
  );
};

const CustomSelectControl = (props) => {
  const { onMenuOpen, value, icon, placeholder, isDisabled } = props.selectProps;

  return (
    <Control {...props}>
      <button
        type="button"
        onClick={onMenuOpen}
        disabled={isDisabled}
        className={`
          flex h-10 w-full gap-2 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1
          ${isDisabled
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer"
        }
        `}
      >
        {icon && <span className="flex-shrink-0 text-gray-500">{icon}</span>}
        <span className={`
          font-medium truncate flex-1 text-left
          ${isDisabled ? "text-gray-400" : "text-gray-700"}
        `}>
          {value?.label || placeholder || ""}
        </span>
      </button>
    </Control>
  );
};
import Select, { components } from "react-select";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui";
import { useTimezones } from "@/hooks/useTimezoneSelect";

const { MenuList, Control, Option } = components;

export const TimezoneSelect = ({ name, control }) => {
  const { options } = useTimezones();
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} style={{ width: "inherit", minWidth: "150px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            menuIsOpen={isOpen}
            onMenuOpen={toggleMenu}
            onMenuClose={toggleMenu}
            onChange={(e) => {
              field.onChange(e?.value);
            }}
            value={options.find(option => option.value === field.value) || options[0]}
            options={options}
            components={{
              Control: CustomSelectControl,
              MenuList: CustomMenuList,
              Option: CustomOption
            }}
            styles={{
              container: (base) => ({
                ...base,
                width: "100%"
              }),
              control: (base) => ({
                ...base,
                border: "1px solid #E2E8F0",
                borderRadius: "0.5rem",
                backgroundColor: "white",
                minHeight: "40px",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#CBD5E0"
                }
              }),
              menu: (base) => ({
                ...base,
                width: "300px",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                marginTop: "4px"
              }),
              menuList: (base) => ({
                ...base,
                padding: 0,
                maxHeight: "300px"
              })
            }}
          />
        )}
      />
    </div>
  );
};

const CustomOption = (props) => (
  <Option {...props} className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
    <FormatOptionLabel label={props.data.label} />
  </Option>
);

const FormatOptionLabel = ({ label }) => {
  const [gmt, city] = label.split(") ");
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-sm text-gray-900">{city}</span>
      <span className="text-xs text-gray-500">{gmt})</span>
    </div>
  );
};

const CustomMenuList = (props) => {
  const { selectProps } = props;
  const { onInputChange, inputValue, onMenuInputFocus } = selectProps;

  return (
    <MenuList {...props}>
      <div className="sticky top-0 bg-white border-b border-gray-200">
        <Input
          type="text"
          placeholder="Search timezone..."
          className="w-full px-3 py-2 text-sm border-none focus:ring-0"
          value={inputValue}
          onChange={(e) =>
            onInputChange(e.target.value, { action: "input-change" })
          }
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
      {props.children}
    </MenuList>
  );
};

const CustomSelectControl = (props) => {
  const { value, onMenuOpen } = props.selectProps;
  const timezone = value.label.split(") ")[1];
  const offset = `GMT${value.offset < 0 ? value.offset : "+" + value.offset}`;

  return (
    <Control {...props}>
      <div
        className="flex items-center gap-2 px-2 w-full cursor-pointer"
        onClick={onMenuOpen}
      >
        <Globe className="h-4 w-4 text-gray-400" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{timezone}</span>
          <span className="text-xs text-gray-500">{offset}</span>
        </div>
      </div>
    </Control>
  );
};

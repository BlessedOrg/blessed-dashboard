"use client";
import { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { MapPin } from "lucide-react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Button, Input } from "@/components/ui";

const { Option, Control, MenuList } = components;

export default function LocationSelect({ setCoordinates, handleCoords }) {
  const selectRef = useRef(null) as any;
  const menuRef = useRef(null) as any;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (v?: boolean) => {
    if (typeof v === "boolean") {
      setIsOpen(v);
    } else {
      setIsOpen(!isOpen);
    }
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
  const handleAddressChange = async (selectedOption) => {
    handleCoords(selectedOption);
    setSelectedAddress(selectedOption);
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: selectedOption.label });
    if (results.length > 0) {
      const { x, y } = results[0];
      setCoordinates([y, x]);
    }
  };

  const handleInputChange = async (
    inputValue: string,
    callback: any
  ): Promise<any> => {
    if (!inputValue) {
      callback([]);
      return;
    }

    const provider = new OpenStreetMapProvider();
    try {
      const results = await provider.search({ query: inputValue });

      const options = results.map((result) => ({
        value: {
          label: result.label,
          x: result.x,
          y: result.y
        },
        label: result.label
      }));
      callback(options);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  return (
    <div ref={menuRef} style={{ width: "inherit" }}>
      <AsyncSelect
        ref={selectRef}
        menuIsOpen={isOpen}
        onMenuOpen={toggleMenu}
        onMenuClose={toggleMenu}
        options={[]}
        onChange={handleAddressChange}
        loadOptions={handleInputChange}
        value={selectedAddress}
        placeholder="Search address"
        closeMenuOnSelect={true}
        components={{
          Control: CustomSelectControl,
          Option: CustomOption,
          MenuList: CustomMenuList
        }}
        styles={{
          container: (prev) => ({
            ...prev,
            width: "100%"
          }),
          menu: (prev) => ({
            ...prev,
            zIndex: 100,
            marginTop: 0,
            borderRadius: 0,
            borderTop: "none"
          }),
          control: (prev) => ({
            ...prev,
            textAlign: "left",
            background: "#ECEDEF",
            border: "none"
          }),
          option: () => ({})
        }}
      />
    </div>
  );
}
const CustomSelectControl = (props) => {
  const { onMenuOpen, value } = props.selectProps;
  return (
    <Control {...props}>
      <Button
        type={"button"}
        onClick={onMenuOpen}
        className="flex gap-2 items-center"
      >
        <MapPin size={20} style={{ minWidth: "20px" }} />
        <p className="font-medium whitespace-nowrap overflow-hidden overflow-ellipsis"
        >
          {!!value?.label ? value.label : "Add Event Location"}
        </p>
      </Button>
    </Control>
  );
};
const CustomOption = (props) => {
  const { isFocused, isSelected, data } = props;
  const optionProps = {
    ...data,
    isFocused,
    isSelected
  };
  return (
    <Option {...props}>
      <FormatOptionLabel {...optionProps} />
    </Option>
  );
};
const FormatOptionLabel = ({ label }) => {
  return (
    <div
      className="flex gap-2 items-center"
    >
      <p className="font-semibold text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"
      >
        {label}
      </p>
    </div>
  );
};

const CustomMenuList = (props) => {
  const { selectProps } = props;
  const { onInputChange, inputValue, onMenuInputFocus } = selectProps;

  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": selectProps["aria-label"],
    "aria-labelledby": selectProps["aria-labelledby"]
  } as any;
  return (
    <MenuList {...props}>
      <div className="flex flex-col gap-2 relative">
        <div className="sticky top-0">
          <Input
            rounded={0}
            type={"text"}
            border={"none"}
            borderBottom={"1px solid"}
            placeholder={"Search"}
            borderColor={"#DAD9DD"}
            value={inputValue}
            onChange={(e) => {
              onInputChange(e.currentTarget.value, {
                action: "input-change"
              });
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.currentTarget.focus();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.currentTarget.focus();
            }}
            onFocus={onMenuInputFocus}
            _active={{}}
            _focusVisible={{}}
            _focus={{}}
            {...ariaAttributes}
          />
        </div>
        {props?.children}
      </div>
    </MenuList>
  );
};

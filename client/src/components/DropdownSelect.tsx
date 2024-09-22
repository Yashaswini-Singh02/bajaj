import React from "react";
import Select from "react-select";

interface DropdownSelectProps {
  options: { value: string; label: string }[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  setSelectedOptions,
}) => {
  const handleSelectChange = (selected: any) => {
    const values = selected ? selected.map((option: any) => option.value) : [];
    setSelectedOptions(values);
  };

  return (
    <div className="w-96 mt-6">
      <Select
        isMulti
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelectChange}
        placeholder="Select options to display data"
      />
    </div>
  );
};

export default DropdownSelect;

import React, { useState, useEffect, useRef } from "react";
import data from "../utils/data.json";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastSelectedItemIndex, setLastSelectedItemIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedItems]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemSelect = (item, index) => {
    setSelectedItems([...selectedItems, item]);
    setLastSelectedItemIndex(index);
    setInputValue("");
  };

  const handleChipRemove = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(updatedItems);
  };

  const handleBackspace = (e) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      const lastSelected = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastSelected);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-2/3 items-center mx-auto">
      <div className="flex flex-wrap gap-2 border p-2 rounded">
        {selectedItems.map((item, index) => (
          <div
            key={item}
            className="flex items-center bg-gray-300 text-black p-2 rounded-full"
          >
            <img
              src={data.find((i) => i.name === item)?.profilePhoto}
              alt=""
              className="mr-2 w-8 h-8 rounded-full"
            />
            <div>
              <div>{item}</div>
            </div>
            <span
              className="cursor-pointer ml-2"
              onClick={() => handleChipRemove(item)}
            >
              X
            </span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-grow ml-2 border-none focus:outline-none"
          placeholder="Add new user..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
        />
      </div>
      <ul className="list-none w-2/3 p-2 border rounded">
        {data
          .filter(
            (item) =>
              !selectedItems.includes(item.name) &&
              (inputValue === "" ||
                item.name.toLowerCase().includes(inputValue.toLowerCase()))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, index) => (
            <li
              key={item.name}
              className={`cursor-pointer ${
                index === lastSelectedItemIndex ? "bg-gray-300" : ""
              }`}
              onClick={() => handleItemSelect(item.name, index)}
            >
              <div className="flex m-1 items-center">
                <img
                  src={item.profilePhoto}
                  alt=""
                  className="mr-2 w-8 h-8 rounded-full"
                />
                <div className="m-1">{item.name}</div>
                <div className="text-gray-500">{item.email}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChipComponent;

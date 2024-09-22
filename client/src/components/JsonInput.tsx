import React from "react";

interface JsonInputProps {
  jsonInput: string;
  setJsonInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const JsonInput: React.FC<JsonInputProps> = ({
  jsonInput,
  setJsonInput,
  handleSubmit,
}) => {
  return (
    <div>
      <textarea
        className="w-96 h-40 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter valid JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Submit JSON
      </button>
    </div>
  );
};

export default JsonInput;

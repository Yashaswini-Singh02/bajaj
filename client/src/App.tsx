import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { ApiResponse } from "./utils/types/shared.types";
import { DROPDOWN_OPTIONS } from "./utils/constants/constants";

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setErrorMessage(null);

      const response = await axios.post<ApiResponse>(
        "http://localhost:8080/bfhl",
        parsedJson
      );

      if (response.data.is_success) {
        setApiResponse(response.data);
      } else {
        setErrorMessage("API call was unsuccessful");
      }
    } catch (error) {
      setErrorMessage("Invalid JSON input or API error");
      console.error(error);
    }
  };

  const handleSelectChange = (selected: any) => {
    const values = selected ? selected.map((option: any) => option.value) : [];
    setSelectedOptions(values);
  };

  const renderResponseData = () => {
    if (!apiResponse) return null;

    return (
      <div className="mt-4">
        {selectedOptions.includes("alphabets") && (
          <div className="mt-2">
            <strong>Alphabets:</strong> {apiResponse.alphabets.join(", ")}
          </div>
        )}
        {selectedOptions.includes("numbers") && (
          <div className="mt-2">
            <strong>Numbers:</strong> {apiResponse.numbers.join(", ")}
          </div>
        )}
        {selectedOptions.includes("highest_lowercase_alphabet") && (
          <div className="mt-2">
            <strong>Highest Lowercase Alphabet:</strong>{" "}
            {apiResponse.highest_lowercase_alphabet || "None"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">JSON Validator and API Caller</h1>

      <textarea
        className="w-96 h-40 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter valid JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Submit JSON
      </button>

      {apiResponse && (
        <div className="w-96 mt-6">
          <Select
            isMulti
            options={DROPDOWN_OPTIONS}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
            placeholder="Select options to display data"
          />
        </div>
      )}

      {renderResponseData()}
    </div>
  );
};

export default App;

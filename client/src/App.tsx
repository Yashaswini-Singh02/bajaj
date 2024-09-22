import React, { useState } from "react";
import axios from "axios";
import { ApiResponse } from "./utils/types/shared.types";
import { DROPDOWN_OPTIONS } from "./utils/constants/constants";
import JsonInput from "./components/JsonInput";
import DropdownSelect from "./components/DropdownSelect";
import ResponseRenderer from "./components/ResponseRenderer";
import ErrorDisplay from "./components/ErrorDisplay";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">JSON Validator and API Caller</h1>

      <JsonInput
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        handleSubmit={handleSubmit}
      />

      {errorMessage && <ErrorDisplay message={errorMessage} />}

      {apiResponse && (
        <DropdownSelect
          options={DROPDOWN_OPTIONS}
          setSelectedOptions={setSelectedOptions}
        />
      )}

      {apiResponse && (
        <ResponseRenderer
          apiResponse={apiResponse}
          selectedOptions={selectedOptions}
        />
      )}
    </div>
  );
};

export default App;

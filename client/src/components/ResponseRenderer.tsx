import React from "react";
import { ApiResponse } from "../utils/types/shared.types";

interface ResponseRendererProps {
  apiResponse: ApiResponse;
  selectedOptions: string[];
}

const ResponseRenderer: React.FC<ResponseRendererProps> = ({
  apiResponse,
  selectedOptions,
}) => {
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

export default ResponseRenderer;

import React from "react";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return <div className="text-red-500 mt-2">{message}</div>;
};

export default ErrorDisplay;

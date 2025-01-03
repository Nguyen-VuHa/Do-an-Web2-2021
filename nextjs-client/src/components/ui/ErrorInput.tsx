import React from "react";

interface ErrorInputProps {
  message: string;
}

const ErrorInput: React.FC<ErrorInputProps> = ({ message }) => {
  return <span className="text-sm italic text-youtube">{message}</span>;
};

export default ErrorInput;

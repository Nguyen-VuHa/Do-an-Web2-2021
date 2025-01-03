import React from "react";

interface ErrorFormGroupProps {
  message: string;
}

const ErrorFormGroup: React.FC<ErrorFormGroupProps> = ({ message }) => {
  return <span className="text-xs italic text-youtube">{message}</span>;
};

export default ErrorFormGroup;

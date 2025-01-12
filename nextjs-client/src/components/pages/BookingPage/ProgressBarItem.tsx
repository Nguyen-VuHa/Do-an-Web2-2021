import React from "react";
import { FiCheck } from "react-icons/fi";

interface ProgressBarItemProps {
  label?: string;
  progressNumber?: string;
  status?: "normal" | "process" | "success";
  iconHidden?: boolean;
}

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({
  label,
  progressNumber,
  status = "normal",
  iconHidden,
}) => {
  return (
    <li
      className={`group relative w-full h-[72px] flex justify-between items-center`}
    >
      <div
        className={`flex items-center space-x-4 px-10 
            ${status === "normal" ? "text-typography" : ""}
            ${status === "process" ? "text-social-x" : ""}
            ${status === "success" ? "text-success" : ""}
        `}
      >
        <div
          className={`
                    flex justify-center items-center w-10 h-10 border-2 rounded-full
                    ${status === "normal" ? "border-typography" : ""}
                    ${status === "process" ? "border-social-x" : ""}
                    ${status === "success" ? "border-success bg-success bg-opacity-30" : ""}
                `}
        >
          {status === "success" ? <FiCheck size={25} /> : progressNumber}
        </div>
        <span className="text-lg font-semibold">{label}</span>
      </div>
      {!iconHidden && (
        <svg
          fill="none"
          viewBox="0 0 22 80"
          preserveAspectRatio="none"
          className={`
                h-full
                ${status === "normal" ? "stroke-typography" : ""}
                ${status === "process" ? "stroke-social-x" : ""}
                ${status === "success" ? "stroke-success" : ""}

            `}
        >
          <path
            d="M0 -2L20 40L0 82"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </li>
  );
};

export default ProgressBarItem;

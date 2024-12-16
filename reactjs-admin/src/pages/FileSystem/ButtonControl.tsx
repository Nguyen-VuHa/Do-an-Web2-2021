import { ReactNode } from 'react';

type ButtonControlProps = {
  onClick?: () => void;
  label?: string;
  icon?: ReactNode;
};

const ButtonControl: React.FC<ButtonControlProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <div
      className="
        flex flex-col justify-start
        p-3 border-2
        rounded-sm cursor-pointer space-y-2 transition-all duration-300
        hover:border-sky hover:text-sky
        "
      onClick={() => {
        onClick && onClick();
      }}
    >
      {icon && icon}
      <span>{label || 'BUTTON CONTROL TITLE'}</span>
    </div>
  );
};

export default ButtonControl;

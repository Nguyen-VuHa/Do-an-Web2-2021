import React from "react";
import { GiStarFormation } from "react-icons/gi";

interface FooterItemProps {
  link?: string;
  title?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({
  link = "#",
  title = "ITEM TITLE",
}) => {
  return (
    <a
      href={link}
      className="group flex items-center space-x-2 hover:text-yellow hover:translate-x-1 transition-all duration-300"
    >
      <GiStarFormation className="transtion-rotate duration-300 group-hover:rotate-180 flex-shrink-0" />
      <span>{title}</span>
    </a>
  );
};

export default FooterItem;

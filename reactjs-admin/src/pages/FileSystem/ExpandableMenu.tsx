import React, { useEffect, useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { CiMenuKebab } from 'react-icons/ci';
import { MdDelete, MdViewInAr } from 'react-icons/md';

type ExpandableMenuProps = {
  onEdit?: () => void;
  onView?: () => void;
  onRemove?: () => void;
};

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({
  onEdit,
  onView,
  onRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Hàm xử lý khi click bên ngoài
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Thêm listener khi component mount
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Gỡ listener khi component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative flex items-center justify-center">
      {/* Nút ba chấm */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 z-[10] flex items-center justify-center rounded-full hover:bg-warning/50 transition-all duration-200"
      >
        <CiMenuKebab size={22} />
      </button>

      {/* Menu các nút */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } transition-all duration-300`}
      >
        {/* Nút 1 */}
        <button
          className="absolute flex justify-center items-center w-10 h-10 bg-sky bg-opacity-40 text-sky rounded-full shadow-md hover:bg-opacity-20 transition-all"
          style={{ transform: 'translateY(-45px)' }}
          onClick={() => {
            onEdit && onEdit();
            setIsOpen(false);
          }}
        >
          <AiFillEdit size={25} />
        </button>

        {/* Nút 2 */}
        <button
          className="absolute flex justify-center items-center w-10 h-10 bg-success bg-opacity-40 text-success rounded-full shadow-md hover:bg-opacity-20 transition-all"
          style={{ transform: 'translate(-40px, 20px)' }}
          onClick={() => {
            onView && onView();
            setIsOpen(false);
          }}
        >
          <MdViewInAr size={25} />
        </button>

        {/* Nút 3 */}
        <button
          className="absolute flex justify-center items-center w-10 h-10 bg-danger bg-opacity-40 text-danger rounded-full shadow-md hover:bg-opacity-20 transition-all"
          style={{ transform: 'translate(40px, 20px)' }}
          onClick={() => {
            onRemove && onRemove();
            setIsOpen(false);
          }}
        >
          <MdDelete size={25} />
        </button>
      </div>
    </div>
  );
};

export default ExpandableMenu;

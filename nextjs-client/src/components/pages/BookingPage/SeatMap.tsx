import React, { useEffect, useRef, useState } from "react";
import { MAX_COL_SEAT, MAX_ROW_SEAT } from "~/constants/seat";
import { useShowtimeStore } from "~/stores/showtime.store";
import SeatItem from "./SeatItem";

const SeatMap = () => {
  const { seatMap } = useShowtimeStore();
  const rows = MAX_ROW_SEAT;
  const cols = MAX_COL_SEAT;

  const seatMapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });

  const [scale, setScale] = useState(0.7);

  // Xử lý sự kiện cuộn chuột để scale
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Xử lý scale
    const newScale = scale - event.deltaY * 0.001; // Điều chỉnh tốc độ scale
    setScale(Math.min(1.5, Math.max(0.5, newScale))); // Giới hạn từ 0.5 đến 1.5
  };

  // Khi bắt đầu kéo
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Khi kéo
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.current.x;
      const newY = e.clientY - startPosition.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  // Khi kết thúc kéo
  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Đảm bảo khi người dùng di chuyển chuột ra ngoài map sẽ dừng kéo
  const onMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Lắng nghe sự kiện wheel trên toàn trang
    window.addEventListener("wheel", preventPageScroll, { passive: false });

    return () => {
      // Gỡ bỏ sự kiện khi component bị unmount
      window.removeEventListener("wheel", preventPageScroll);
    };
  }, []);

  const preventPageScroll = (event: WheelEvent) => {
    // Kiểm tra nếu con trỏ chuột nằm trong phạm vi map
    const target = seatMapRef.current;
    if (target && target.contains(event.target as Node)) {
      event.preventDefault(); // Ngăn cuộn toàn trang
    }
  };

  // Tạo grid với mảng 2 chiều
  const grid = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className="flex">
      {Array.from({ length: cols }, (_, colIndex) => {
        const isMatch = seatMap.find(
          (seat) => seat.x === colIndex && seat.y === rowIndex,
        );

        return (
          <div
            key={colIndex}
            className="relative w-full h-full flex flex-col items-start justify-center text-xs p-1 cursor-pointer"
          >
            {isMatch && <SeatItem seat={isMatch} />}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div
      ref={seatMapRef}
      className="relative w-full h-[600px] border-2 border-second rounded-circle-md p-30 select-none overflow-hidden"
      onWheel={(e) => handleWheel(e)}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{
        cursor: isDragging ? "move" : "default",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.2s",
        }}
      >
        <div
          style={{
            width: `${40 * cols + (cols - 1) * 2}px`,
            marginBottom: "100px",
          }}
        >
          {/* Màn hình chiếu */}
          <div className="relative z-10 w-full max-w-screen-xl mx-auto text-center px-4 py-8">
            <div className="w-full h-auto bg-social-x rounded-md shadow-lg text-2xl">
              Màn hình
            </div>
            <div className="absolute left-[-5%] right-0">
              <div className="w-[104%] h-16 bg-gradient-to-b from-social-x to-transparent rounded-t-full"></div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col"
          style={{ width: `${40 * cols + (cols - 1) * 2}px` }}
        >
          {grid}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SeatMap);

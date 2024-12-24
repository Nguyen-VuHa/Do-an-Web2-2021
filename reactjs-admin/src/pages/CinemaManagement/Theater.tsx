import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

// Định nghĩa interface cho ghế
interface Seat {
  id: number;
  x: number;
  y: number;
  occupied: boolean;
  label: string;
}

const Theater: React.FC = () => {
  const seatWidth = 50;  // Kích thước ngang của ghế (px)
  const seatHeight = 30;  // Kích thước dọc của ghế (px)
  const rows = 25;  // Số hàng ghế (hoặc bảng chữ cái dọc)
  const cols = 20;  // Số cột ghế (20 ghế trên mỗi dòng)
  const margin = 10;  // Khoảng cách giữa các ghế

  const rowsSeat = 5;  // Số hàng ghế (hoặc bảng chữ cái dọc)
  const colsSeat = 10;  // Số cột ghế (20 ghế trên mỗi dòng)

  const getRowLabel = (index: number) => {
    return String.fromCharCode(65 + index); // Chuyển đổi 0 -> A, 1 -> B, ...
  };

  // Danh sách ghế với trạng thái occupied
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: rowsSeat * colsSeat }, (_, index) => {
      const x = index % colsSeat;
      const y = Math.floor(index / colsSeat);
      const label = `${getRowLabel(y)}${(x % colsSeat) + 1}`;  // Tạo nhãn cho ghế, mỗi dòng bắt đầu lại từ 1

      return {
        id: index + 1,
        occupied: false,
        x,
        y,
        label,
      };
    })
  );

  const [seatLayout, setSeatLayout] = useState<Seat[]>(
    Array.from({ length: rows * cols }, (_, index) => {
      const x = index % cols;
      const y = Math.floor(index / cols);
      const label = `${getRowLabel(y)}${(x % cols) + 1}`;  // Tạo nhãn cho ghế, mỗi dòng bắt đầu lại từ 1

      return {
        id: index + 1,
        occupied: false,
        x,
        y,
        label,
      };
    })
  );

  // Cấu hình React Grid Layout cho ghế
  const layout = seatLayout.map(seat => ({
    i: seat.id.toString(),
    x: seat.x,
    y: seat.y,
    w: 1,  // Chiều rộng mỗi ghế (1 ô trong grid)
    h: 1,  // Chiều cao mỗi ghế (1 ô trong grid)
  }));

  // Tạo background cho bảng chữ cái
  const renderBackground = () => {
    const background = [];
    for (let y = 0; y < rows; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) {
        row.push(
            <div key={`cell-${y}-${x}`} style={{
                display: 'inline-block',
                width: seatWidth,
                height: seatHeight,
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                textAlign: 'center',
                lineHeight: `${seatHeight}px`,
                verticalAlign: 'top',
                fontSize: '14px',
                fontWeight: 'bold',
            }}>
            {getRowLabel(y)}{x + 1}
            </div>
        );
      }
      background.push(<div key={`row-${y}`} style={{ display: 'flex' }}>{row}</div>);
    }
    return background;
  };

  return (
    <div style={{ position: 'relative', width: cols * (seatWidth + margin), height: rows * (seatHeight + margin) }}>
      {/* Render background của grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        {renderBackground()}
      </div>

      {/* Render React Grid Layout với các ghế */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={seatHeight + margin}
        width={cols * (seatWidth + margin)}
        // isDraggable
        isResizable
        onDragStop={(layout) => {
            const newSeats = seats.map(seat => {
              const newLayout = layout.find(l => l.i === seat.id.toString());
              if (newLayout) {
                // Giới hạn phạm vi cột (x) mà không thay đổi dòng (y)
                const newX = Math.max(0, Math.min(newLayout.x, cols - 1));  // Giới hạn phạm vi cột
                const newY = Math.max(0, Math.min(newLayout.y, rows - 1));
                
                return { ...seat, x: newX, y: newY };  // Chỉ thay đổi x, giữ nguyên y
              }
              return seat;
            });
          
            // Cập nhật danh sách ghế mới
            setSeats(newSeats);
          }}
      >
        {seats.map(seat => (
          <div
            key={seat.id}
            style={{
              backgroundColor: 'green',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            {seat.label}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Theater;

import GridLayout from 'react-grid-layout';
import { MAX_COL_SEAT, MAX_ROW_SEAT } from '~/constants/seat';
import useSeatStore from '~/stores/seat.store';
import SeatMapItem from './SeatMapItem';
import { useState } from 'react';

const GAP_ITEM = 5;
const SEAT_WIDTH = 80;
const SEAT_HEIGHT = 40;

const SeatMap = () => {
  const { seatMap, setStateSeat } = useSeatStore();
  const [seatHover, setSeatHover] = useState<number>(0);

  const layout = seatMap.map((seat) => ({
    i: seat.id.toString(),
    x: seat.x,
    y: seat.y,
    w: 1, // Chiều rộng mỗi ghế (1 ô trong grid)
    h: 1, // Chiều cao mỗi ghế (1 ô trong grid)
  }));

  return (
    <div
      className="select-none"
      style={{
        position: 'relative',
        width: MAX_COL_SEAT * (SEAT_WIDTH + GAP_ITEM),
        height: MAX_ROW_SEAT * (SEAT_HEIGHT + GAP_ITEM),
      }}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={MAX_COL_SEAT}
        rowHeight={SEAT_HEIGHT + GAP_ITEM}
        width={MAX_COL_SEAT * (SEAT_WIDTH + GAP_ITEM)}
        compactType={null}
        isResizable
        margin={[10, 25]}
        onDragStop={(layout) => {
          const newSeats = seatMap.map((seat) => {
            const newLayout = layout.find((l) => l.i === seat.id.toString());
            if (newLayout) {
              const newX = Math.max(0, Math.min(newLayout.x, MAX_COL_SEAT - 1)); // Giới hạn phạm vi cột
              const newY = seat.y; // Giữ nguyên giá trị y ban đầu

              // Nếu ghế không thay đổi cột (x), giữ nguyên y
              if (newLayout.x !== seat.x) {
                // Kiểm tra xem có ghế nào chiếm vị trí trong dòng mới không
                const seatInRow = seatMap.find(
                  (s) => s.y === seat.y && s.x === newX,
                );

                // Nếu không có ghế chiếm chỗ, thay đổi cột (x) mà không thay đổi dòng (y)
                if (!seatInRow) {
                  return { ...seat, x: newX, y: seat.y }; // Giữ nguyên y
                }
              }

              return { ...seat, x: newX, y: newY }; // Giữ nguyên y khi không thay đổi
            }
            return seat;
          });

          // Cập nhật lại layout ghế
          setStateSeat('seatMap', newSeats);
        }}
      >
        {seatMap.map((seat) => {
          return (
            <div
              key={seat.id}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={() => {
                if (seat.status === 1) setSeatHover(seat.id);
              }}
              onMouseLeave={() => {
                setSeatHover(0);
              }}
            >
              {seat.status === 1 && (
                <SeatMapItem isHover={seatHover === seat.id} data={seat} />
              )}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default SeatMap;

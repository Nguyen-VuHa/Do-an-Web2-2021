import React from 'react';
import Tag from '~/components/Tag';
import { ICrawlShowtimeData } from '~/types/crawler.type';

type ShowtimeDataItemProps = {
  data: ICrawlShowtimeData;
};

const ShowtimeDataItem: React.FC<ShowtimeDataItemProps> = ({ data }) => {
  return (
    <div className="relative space-y-2 p-4 max-w-full cursor-pointer rounded-md transition-all duration-300 hover:bg-primary hover:bg-opacity-20">
      <div className="text-warning font-semibold border-b-[1px]">
        {data.movie}
      </div>
      <div>
        {data.showtimes.map((showtime) => {
          return (
            <div key={showtime.cinema} className="space-y-2 mb-2">
              <Tag label={showtime.cinema} color="warning" />
              <div className="flex flex-wrap gap-2">
                {showtime.times.map((time) => {
                  return <Tag key={time} label={time} color="success" />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowtimeDataItem;

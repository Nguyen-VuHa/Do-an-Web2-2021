import { useBookingStore } from "~/stores/booking.store";
import ProgressBarItem from "./ProgressBarItem";

interface IProgressBar {
  id: number;
  label: string;
}

const ProgressBarList: IProgressBar[] = [
  {
    id: 1,
    label: "Chọn ghế",
  },
  {
    id: 2,
    label: "Thanh toán",
  },
  {
    id: 3,
    label: "Hoàn tất",
  },
];

const ProgressBar = () => {
  const { processBooking } = useBookingStore()
  return (
    <ol className="flex flex-col border-second w-full px-10 md:px-0 md:flex-row">
      {ProgressBarList.map((progress, index) => {
        return (
          <ProgressBarItem
            key={progress.id}
            label={progress.label}
            progressNumber={`0${index + 1}`}
            iconHidden={index === ProgressBarList.length - 1}
            status={(processBooking === progress.id && "process") || (processBooking > progress.id && 'success') || "normal"}
          />
        );
      })}
    </ol>
  );
};

export default ProgressBar;

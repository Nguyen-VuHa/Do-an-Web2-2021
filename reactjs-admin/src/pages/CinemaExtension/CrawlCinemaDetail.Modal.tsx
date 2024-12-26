interface CrawlCinemaDetailProps {
  isOpen?: boolean;
}

const CrawlCinemaDetail: React.FC<CrawlCinemaDetailProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center dark:bg-boxdark/50 bg-strokedark/30
        ${isOpen ? 'z-[10000] transition-all' : 'hidden z-[-10]'}`}
    >
      <div className="flex flex-col justify-center items-center bg-strokedark bg-opacity-80 px-3 py-2 rounded-lg space-y-2">
        <img
          src="https://media.tenor.com/pZ8p63XYlhIAAAAj/bubu12.gif"
          alt="Loading GIF"
        />
        <span className="text-warning">
          Bạn chờ xíu nhé, tiến trình thu thập đang diễn ra...
        </span>
      </div>
    </div>
  );
};

export default CrawlCinemaDetail;

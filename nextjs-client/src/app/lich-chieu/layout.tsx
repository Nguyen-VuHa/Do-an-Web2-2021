import ShowtimeTabs from "~/components/pages/ShowtimePage/ShowtimeTab";

const ShowtimeLayout = ({ children }) => {
  return (
    <div className="container mx-auto py-10 px-5 md:px-0">
      <ShowtimeTabs />

      {children}
    </div>
  );
};

export default ShowtimeLayout;

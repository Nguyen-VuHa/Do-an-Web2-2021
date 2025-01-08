import { notFound } from "next/navigation";
import { apiFetchCinemaDetail } from "~/apis/cinema.api";
import MaintainceScreen from "~/components/common/MaintainceScreen";
import CinemaDetaiLeftContent from "~/components/pages/CinemaDetailPage/CinemaDetaiLeftContent";
import CinemaDetailHeader from "~/components/pages/CinemaDetailPage/CinemaDetailHeader";
import CinemaDetailRightContent from "~/components/pages/CinemaDetailPage/CinemaDetailRightContent";

interface Params {
  slug: string;
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { data } = await apiFetchCinemaDetail(slug);

  if (!data) {
    notFound();
  }

  // Dữ liệu động cho metadata
  const title = `${data.cinema_name} - BHD Star`;

  return {
    title, // Set title
  };
}

const CinemaDetailMain = async ({ params }: { params: Params }) => {
  try {
    const { data } = await apiFetchCinemaDetail(params.slug);

    if (!data) {
      notFound();
    }

    return (
      <>
        <div className="container mx-auto py-10 space-y-5">
          <CinemaDetailHeader title={data.cinema_name} />
          <div className="grid grid-cols-1 xl:grid-cols-5 space-y-3 lg:space-y-0 lg:gap-4 px-5 lg:px-0">
            <CinemaDetaiLeftContent data={data} />
            <CinemaDetailRightContent embed_url={data.embed_map_url} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <MaintainceScreen />;
  }
};

export default CinemaDetailMain;

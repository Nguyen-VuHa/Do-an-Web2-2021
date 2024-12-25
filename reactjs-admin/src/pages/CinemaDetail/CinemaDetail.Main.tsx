import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Tag from '~/components/Tag';
import { ACTIVE } from '~/constants/status';
import useCinemaStore from '~/stores/cinema.store';

const CinemaDetail = () => {
  const navigate = useNavigate();
  const { cinemaDetail, reqFetchCinemaDetail } = useCinemaStore();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const fetchCinemaDetail = async () => {
        if (slug) {
          const isFetchDetail = await reqFetchCinemaDetail(slug);

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchCinemaDetail();
    }

    return () => {};
  }, []);

  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            Thông tin chi rạp chiếu phim
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-end border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THÔNG TIN RẠP CHIẾU PHIM
          </h3>
        </div>

        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Tên rạp chiếu phim"
                  element={
                    <div className="text-lg text-warning">
                      {cinemaDetail?.cinema_name}
                    </div>
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Slug URL"
                  element={
                    <div className="text-lg text-warning">
                      {cinemaDetail?.slug}
                    </div>
                  }
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Khu vực"
                  element={
                    <Tag label={cinemaDetail?.area || ''} color="cyan" />
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Trạng thái"
                  element={
                    <Tag
                      label={
                        cinemaDetail?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'
                      }
                      color={
                        cinemaDetail?.status === ACTIVE ? 'success' : 'danger'
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Địa chỉ"
                  element={
                    <div className="text-lg text-warning">
                      {cinemaDetail?.address}
                    </div>
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Embed URL Map"
                  element={
                    <iframe
                      src={cinemaDetail?.embed_map_url}
                      className="w-full"
                      height="450"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CinemaDetail;

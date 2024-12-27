import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Tag from '~/components/Tag';
import useScreenStore from '~/stores/screen.store';
import { stringToInt } from '~/utils/convert';

const ScreenDetail = () => {
  const { screen_id } = useParams();
  const navigate = useNavigate();
  const { screenDetail, resetScreenForm, reqFetchScreenDetail } =
    useScreenStore();

  useEffect(() => {
    if (screen_id) {
      const fetchScreenDetail = async () => {
        if (screen_id) {
          const isFetchDetail = await reqFetchScreenDetail(
            stringToInt(screen_id),
          );

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchScreenDetail();
    }

    return () => {
      resetScreenForm();
    };
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
            Thông tin phòng chiếu
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-end border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THÔNG TIN PHÒNG CHIẾU
          </h3>
        </div>

        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Tên phòng chiếu"
                element={
                  <div className="text-lg text-warning">
                    {screenDetail?.screen_name}
                  </div>
                }
              />
            </div>

            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Loại phòng chiếu"
                element={
                  <div className="text-lg text-warning">
                    {screenDetail?.screen_type}
                  </div>
                }
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <FormGroup
              label="Thuộc rạp chiếu"
              element={
                <Tag
                  label={screenDetail?.cinema.cinema_name || ''}
                  color="sky"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenDetail;

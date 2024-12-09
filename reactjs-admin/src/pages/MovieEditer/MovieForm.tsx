import DatePicker from '~/components/DatePicker';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';

const MovieForm = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THÔNG TIN PHIM
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5">
              <FormGroup
                label="Tên Phim"
                isRequire
                element={<Input placeholder="Ví dụ: Titanic . . ." />}
              />
            </div>

            <div className="mb-4.5">
              <FormGroup
                label="Thời lượng phim (phút)"
                isRequire
                element={<Input placeholder="Ví dụ: 180 ..." type="number" />}
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Ngày khởi chiếu"
                  isRequire
                  element={<DatePicker />}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Ngày kết thúc"
                  isRequire
                  element={<DatePicker />}
                />
              </div>
            </div>

            <div className="mb-4.5">
              <FormGroup
                label="Trailer ID (Video Youtube ID)"
                isRequire
                element={<Input placeholder="Ví dụ: M1pBg9m2lTx ..." />}
              />
            </div>

            <div className="mb-4.5">
              <FormGroup
                label="Mô tả (nếu có)"
                element={<TextArea rows={6} />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;

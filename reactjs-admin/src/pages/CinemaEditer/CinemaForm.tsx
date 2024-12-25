import React, { useCallback } from 'react';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import TextArea from '~/components/TextArea';
import useCinemaStore from '~/stores/cinema.store';
import { convertToSlug } from '~/utils/convert';
import { provinces } from '~/utils/provinces';

const CinemaForm = () => {
  const { cinemaForm, cinemaFormError, setCinemaForm } = useCinemaStore();

  const keysSpecial = ['slug'];
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;

      if (keysSpecial.includes(name)) {
        const slugClean = convertToSlug(value);

        setCinemaForm({
          [name]: slugClean,
        });
        return;
      }

      setCinemaForm({
        [name]: value,
      });
    },
    [],
  );

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          THÔNG TIN RẠP CHIẾU
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <FormGroup
              label="Tên Rạp Chiếu"
              isRequire
              element={
                <Input
                  placeholder="Ví dụ: BHD Lê Văn Việt . . ."
                  name="cinema_name"
                  value={cinemaForm.cinema_name}
                  onChange={handleChangeInput}
                />
              }
              messageError={cinemaFormError?.cinema_name}
            />
            <FormGroup
              label="Chọn Khu Vực"
              isRequire
              element={
                <InputMultiSelect
                  isSingleValue
                  options={provinces}
                  values={[cinemaForm.area]}
                  onSelect={(value) => {
                    setCinemaForm({
                      area: value,
                    });
                  }}
                  onRemove={() => {
                    setCinemaForm({
                      area: '',
                    });
                  }}
                />
              }
              messageError={cinemaFormError?.area}
            />
          </div>

          <div className="mb-4.5">
            <FormGroup
              label="Slug URL"
              isRequire
              element={
                <Input
                  placeholder="Ví dụ: bhd-le-van-viet . . ."
                  name="slug"
                  value={cinemaForm.slug}
                  onChange={handleChangeInput}
                />
              }
              messageError={cinemaFormError?.slug}
            />
          </div>

          <div className="mb-4.5">
            <FormGroup
              label="Địa chỉ rạp chiếu"
              isRequire
              element={
                <TextArea
                  rows={6}
                  name="address"
                  placeholder="Ví dụ: Tầng 4, Vincom Plaza Lê Văn Việt ..."
                  value={cinemaForm.address}
                  onChange={handleChangeInput}
                />
              }
              messageError={cinemaFormError?.address}
            />
          </div>

          <div className="mb-4.5">
            <FormGroup
              label="URL Embed Map (Google Map)"
              isRequire
              element={
                <TextArea
                  rows={6}
                  name="embed_map_url"
                  placeholder="Ví dụ: https://www.google.com/maps..."
                  value={cinemaForm.embed_map_url}
                  onChange={handleChangeInput}
                />
              }
              messageError={cinemaFormError?.embed_map_url}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CinemaForm);

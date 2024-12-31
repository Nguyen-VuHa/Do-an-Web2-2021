import dayjs from 'dayjs';
import { useEffect } from 'react';
import DatePicker from '~/components/DatePicker';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import useMovieStore from '~/stores/movie.store';
import useScreenStore from '~/stores/screen.store';
import useShowtimeStore from '~/stores/showtime.store';
import { formatVND } from '~/utils/common';
import { stringToInt } from '~/utils/convert';

const ShowtimeForm = () => {
  const { cinemaSelect, screenSelection, reqFetchScreenSelection } =
    useScreenStore();
  const { movieSelection } = useMovieStore();
  const { cinemaSelected, showtimeForm, showtimeFormError, setStateShowtime } =
    useShowtimeStore();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (cinemaSelected) {
        reqFetchScreenSelection(cinemaSelected);
        setStateShowtime('showtimeForm', {
          ...showtimeForm,
          screen: 0,
        });
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [cinemaSelected]);

  return (
    <>
      <div className="border-b border-stroke dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          THÔNG TIN SUẤT CHIẾU
        </h3>
      </div>
      <form action="#" className="py-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <FormGroup
            label="Thời gian chiếu"
            isRequire
            element={
              <DatePicker
                type="datetime-local"
                name="start_date"
                value={showtimeForm.start_date}
                onChange={(e) => {
                  const valueDate = e.target.value;
                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    start_date: dayjs(valueDate).format('YYYY-MM-DD HH:mm'),
                  });
                }}
              />
            }
            messageError={showtimeFormError?.start_date || ''}
          />
          <FormGroup
            label="Giá vé cho suất chiếu (VNĐ)"
            isRequire
            element={
              <Input
                placeholder="Ví dụ: 100,000.."
                name="unit_price"
                value={
                  showtimeForm.unit_price
                    ? formatVND(showtimeForm.unit_price.toString())
                    : ''
                }
                onChange={(e) => {
                  const priceClean = e.target.value.replace(/\D/g, '');

                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    unit_price: stringToInt(priceClean),
                  });
                }}
              />
            }
            messageError={showtimeFormError?.unit_price || ''}
          />
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <FormGroup
            label="Chọn rạp chiếu phim"
            isRequire
            element={
              <InputMultiSelect
                isSingleValue
                options={cinemaSelect}
                values={[cinemaSelected]}
                onSelect={(value) => {
                  setStateShowtime('cinemaSelected', value);
                }}
                onRemove={() => {
                  setStateShowtime('cinemaSelected', 0);
                }}
              />
            }
            messageError={showtimeFormError?.cinema || ''}
          />
          <FormGroup
            label="Chọn phòng chiếu"
            isRequire
            element={
              <InputMultiSelect
                isSingleValue
                options={screenSelection}
                values={[showtimeForm.screen]}
                onSelect={(value) => {
                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    screen: value,
                  });
                }}
                onRemove={() => {
                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    screen: 0,
                  });
                }}
              />
            }
            messageError={showtimeFormError?.screen || ''}
          />
        </div>
        <div className="mb-4.5">
          <FormGroup
            label="Chọn phim cho suất chiếu"
            isRequire
            element={
              <InputMultiSelect
                isSingleValue
                options={movieSelection}
                values={[showtimeForm.movie]}
                onSelect={(value) => {
                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    movie: value,
                  });
                }}
                onRemove={() => {
                  setStateShowtime('showtimeForm', {
                    ...showtimeForm,
                    movie: '',
                  });
                }}
              />
            }
            messageError={showtimeFormError?.movie || ''}
          />
        </div>
      </form>
    </>
  );
};

export default ShowtimeForm;

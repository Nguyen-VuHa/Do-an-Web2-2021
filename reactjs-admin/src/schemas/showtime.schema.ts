import * as Yup from 'yup';

const showtimeSchema = Yup.object().shape({
  start_date: Yup.date()
    .typeError('Thời gian chiếu không hợp lệ')
    .required('Thời gian chiếu là bắt buộc'),

  unit_price: Yup.number()
    .required('Giá vé là bắt buộc')
    .moreThan(0, 'Giá vé là bắt buộc')
    .max(1000000, 'Giá vé không vượt quá 1 triệu VNĐ'),

  cinema: Yup.number()
    .required('Chọn rạp chiếu để tải phòng chiếu của rạp tương ứng')
    .moreThan(0, 'Chọn rạp chiếu để tải phòng chiếu của rạp tương ứng'),

  screen: Yup.number()
    .required('Chọn phòng chiếu là bắt buộc')
    .moreThan(0, 'Chọn phòng chiếu là bắt buộc'),

  movie: Yup.string().required('Chọn phim cho suất chiếu là bắt buộc'),
});

export default showtimeSchema;

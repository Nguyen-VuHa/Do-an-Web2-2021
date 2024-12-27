import * as Yup from 'yup';

const screenSchema = Yup.object().shape({
  screen_name: Yup.string()
    .required('Tên phòng chiếu phim là bắt buộc')
    .max(240, 'Tên phòng chiếu không được dài quá 240 ký tự'),

  screen_type: Yup.string().required('Loại phòng chiếu là bắt buộc'),

  cinema: Yup.number().required('Chọn rạp chiếu cho phòng chiếu là bắt buộc'),
});

export default screenSchema;

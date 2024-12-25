import * as Yup from 'yup';

const cinemaSchema = Yup.object().shape({
  cinema_name: Yup.string()
    .required('Tên rạp chiếu phim là bắt buộc')
    .max(240, 'Tên rạp chiếu không được dài quá 240 ký tự'),

  slug: Yup.string()
    .required('Slug URL là bắt buộc')
    .max(140, 'Slug không được dài quá 140 ký tự'),

  address: Yup.string()
    .required('Địa chỉ rạp chiếu là bắt buộc')
    .max(240, 'Tên địa chỉ rạp chiếu không được dài quá 240 ký tự'),

  area: Yup.string()
    .required('Khu vực là bắt buộc')
    .max(40, 'Tên khu vực không được dài quá 40 ký tự'),

  embed_map_url: Yup.string()
    .required('URL Embed Map là bắt buộc')
    .url('URL Embed Map không hợp lệ'),
});

export default cinemaSchema;

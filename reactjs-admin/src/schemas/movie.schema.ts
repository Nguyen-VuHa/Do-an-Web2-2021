import * as Yup from 'yup';

const movieSchema = Yup.object().shape({
    title: Yup.string()
    .required('Tên phim là bắt buộc') 
    .max(240, 'Tên phim không được dài quá 240 ký tự'),

    duration: Yup.number()
    .required('Thời gian chiếu là bắt buộc') 
    .max(240, 'Thời gian bộ phim không vượt quá 240 phút'),

    start_date: Yup.date()
    .typeError('Ngày không hợp lệ')
    .required('Ngày khởi chiếu là bắt buộc'),

    end_date: Yup.date()
    .required('Ngày kết thúc là bắt buộc')
    .typeError('Ngày không hợp lệ')
    .test('is-after', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', function(value) {
        const { start_date } = this.parent; // Lấy giá trị start_date từ đối tượng cha
        return value && new Date(value) > new Date(start_date); // Kiểm tra end_date > start_date
    }),

    trailer_id: Yup.string()
    .required('Trailer ID là bắt buộc') 
    .max(30, 'Trailer ID không được dài quá 30 ký tự'),

    description: Yup.string()
    .max(1000, 'Mô tả không được dài quá 1000 ký tự'),

    director: Yup.array()
    .of(Yup.number().required()) // Mỗi phần tử trong mảng phải là số
    .min(1, 'Vui lòng chọn đạo diễn') // Mảng phải có ít nhất 1 phần tử
    .required('Đạo diễn là bắt buộc'), // Bắt buộc phải có giá trị,

    actors: Yup.array()
    .of(Yup.number().required()) // Mỗi phần tử trong mảng phải là số
    .min(1, 'Vui lòng chọn diễn viên') // Mảng phải có ít nhất 1 phần tử
    .required('Diễn viên là bắt buộc'), // Bắt buộc phải có giá trị,

    categories: Yup.array()
    .of(Yup.number().required()) // Mỗi phần tử trong mảng phải là số
    .min(1, 'Vui lòng chọn thể loại') // Mảng phải có ít nhất 1 phần tử
    .required('Thể loại là bắt buộc'), // Bắt buộc phải có giá trị,
});

export default movieSchema;
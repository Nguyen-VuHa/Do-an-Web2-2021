import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ') // Validate định dạng email
    .required('Email là bắt buộc'), // Bắt buộc nhập email
  password: Yup.string()
    .required('Mật khẩu là bắt buộc') // Bắt buộc nhập mật khẩu
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự') // Tối thiểu 6 ký tự
    .max(20, 'Mật khẩu không được vượt quá 20 ký tự'), // Tối đa 50 ký tự
});

export default signInSchema;
import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc")
    .max(90, "Email không được vượt quá 90 ký tự"),

  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được dài quá 20 ký tự")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#^()*?&])[A-Za-z\d@$!%#^()*?&]{8,20}$/,
      "Mật khẩu phải chứa ít nhất một chữ cái, một chữ số và một ký tự đặc biệt",
    )
    .required("Mật khẩu là trường bắt buộc"),

  confirm_password: Yup.string()
    .required("Mật khẩu xác nhận là trường bắt buộc")
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp với mật khẩu"),

  fullname: Yup.string()
    .max(100, "Họ & tên không được dài quá 100 ký tự")
    .required("Họ & tên là trường bắt buộc"),

  phone_number: Yup.string()
    .matches(/^(\+84|0)(9|3|7|8|5)[0-9]{8}$/, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),

  birth_date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh phải theo định dạng YYYY-MM-DD")
    .required("Ngày sinh là trường bắt buộc"),
});

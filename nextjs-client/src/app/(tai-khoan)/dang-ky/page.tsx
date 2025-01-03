import FormSignUp from "~/components/pages/SignUpPage/FormSignUp";

export const metadata = {
  title: "Đăng ký thành viên - BHD Star",
};

const SignUpPage = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-20 space-y-10 max-w-[350px]">
      <h2
        className="text-3xl font-medium text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram"
      >
        Đăng Ký Tài Khoản
      </h2>
      <FormSignUp />
    </div>
  );
};

export default SignUpPage;

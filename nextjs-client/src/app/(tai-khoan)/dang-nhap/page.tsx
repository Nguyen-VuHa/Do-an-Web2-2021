import FormSignIn from "~/components/pages/SignInPage/FormSignIn";

export const metadata = {
  title: "Đăng nhập tài khoản - BHD Star",
};

const SignInPage = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-20 space-y-10 max-w-[350px]">
      <h2
        className="text-3xl font-medium text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram"
      >
        Đăng Nhập Tài Khoản
      </h2>
      <FormSignIn />
    </div>
  );
};

export default SignInPage;

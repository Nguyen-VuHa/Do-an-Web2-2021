import Link from "next/link";
import Button from "~/components/ui/Button";

const Control = () => {
  return (
    <div className="flex items-center space-x-1">
      <Link href="dang-nhap">
        <Button buttonType="success">Đăng nhập</Button>
      </Link>
      <div className="h-[20px] rounded-circle-lg border-l-2 border-typography"></div>
      <Link href="dang-ky">
        <Button>Đăng ký</Button>
      </Link>
    </div>
  );
};

export default Control;

import React from "react";
import Button from "~/components/ui/Button";

const Control = () => {
  return (
    <div className="flex items-center space-x-1">
      <Button buttonType="success">Đăng nhập</Button>
      <div className="h-[20px] rounded-circle-lg border-l-2 border-typography"></div>
      <Button>Đăng ký</Button>
    </div>
  );
};

export default Control;

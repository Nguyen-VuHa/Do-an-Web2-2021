import React, { ReactNode } from "react";

type FieldInputProps = {
  isEdit?: boolean;
  editComponent?: ReactNode;
  children: ReactNode;
};

const FieldInput: React.FC<FieldInputProps> = ({
  isEdit,
  editComponent,
  children,
}) => {
  return <>{isEdit ? editComponent : children}</>;
};

export default FieldInput;

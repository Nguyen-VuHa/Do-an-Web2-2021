import React, { ReactNode, useEffect } from 'react';

type PageTitleProps = {
  title: string;
  children: ReactNode;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = `BHD Star - ${title}`;
  }, [title]);

  return <>{children}</>;
};

export default PageTitle;

import React, { ReactNode } from "react";
import Header from "../Header/Header.Main";
import Footer from "../Footer/Footer.Main";

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <main className="container mx-auto">
      <Header />
      <div className="w-full h-full">{children}</div>
      <Footer />
    </main>
  );
};

export default PublicLayout;

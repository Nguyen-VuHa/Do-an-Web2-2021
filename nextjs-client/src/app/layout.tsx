import PublicLayout from "~/components/layouts/PublicLayout/PublicLayout";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-layout">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}

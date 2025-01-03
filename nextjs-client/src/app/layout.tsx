"use client";
import PublicLayout from "~/components/layouts/PublicLayout/PublicLayout";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SnackbarProvider } from "notistack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-layout">
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top", // Hoặc 'bottom'
            horizontal: "right", // Hoặc 'left', 'center'
          }}
        >
          <PublicLayout>{children}</PublicLayout>
        </SnackbarProvider>
      </body>
    </html>
  );
}

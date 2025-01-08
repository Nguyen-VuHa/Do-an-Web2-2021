"use client";
import PublicLayout from "~/components/layouts/PublicLayout/PublicLayout";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SnackbarProvider } from "notistack";
import ViewTrailer from "~/components/common/ViewTrailer";
import { useGlobalStore } from "~/stores/global.store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isModalViewTrailer } = useGlobalStore();
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
          {isModalViewTrailer && <ViewTrailer />}

          <PublicLayout>{children}</PublicLayout>
        </SnackbarProvider>
      </body>
    </html>
  );
}

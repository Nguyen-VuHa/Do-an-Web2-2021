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
  const { isModalViewTrailer, isDisableScreen } = useGlobalStore();
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

          {isDisableScreen && (
            <div className="fixed w-full h-full top-0 left-0 z-[9999999]" />
          )}

          <PublicLayout>{children}</PublicLayout>
        </SnackbarProvider>
      </body>
    </html>
  );
}

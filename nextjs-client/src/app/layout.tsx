import PublicLayout from "~/components/layouts/PublicLayout/PublicLayout";
import "./globals.css";

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

import PublicLayout from "~/components/layouts/PublicLayout/PublicLayout";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <PublicLayout>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}

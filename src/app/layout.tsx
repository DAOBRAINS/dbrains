import "./globals.css";

export const metadata = {
  title: "DBrains",
  description: "the fully collaborative freelancing plateforme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

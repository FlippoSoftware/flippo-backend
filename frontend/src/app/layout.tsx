import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flippo",
  description: ""
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"}>
      <head>
        <script src='https://accounts.google.com/gsi/client' async defer />
      </head>
      <body>{children}</body>
    </html>
  );
}

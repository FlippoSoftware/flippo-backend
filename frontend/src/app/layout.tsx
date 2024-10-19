import { AuthSession } from "@modules/Auth";

import type { Metadata } from "next";

import "@settings/styles/global.scss";

export const metadata: Metadata = {
  title: "Flippo",
  description: ""
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang={"en"}>
      <head></head>
      <body>
        <AuthSession>
          {modal}
          {children}
        </AuthSession>
      </body>
    </html>
  );
}

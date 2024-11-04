import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastContainer } from "@widgets/ToastContainer";
import { AuthSession } from "@modules/Auth";

import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

import "@settings/styles/global.scss";

export const metadata: Metadata = {
  title: "Flippo",
  description: ""
};

export default async function RootLayout({
  children,
  modal,
  params
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={"en"}>
      <head></head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ToastContainer toastCountOnScreen={4} />
          <AuthSession>
            {modal}
            {children}
          </AuthSession>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

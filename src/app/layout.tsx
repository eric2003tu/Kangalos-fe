import type React from "react";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { generateMetadata, viewport } from "./metadata";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const libreBaskerville = localFont({
  src: "./fonts/Libre-Baskerville.woff",
  variable: "--font-libre-baskerville",
  weight: "400",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export { generateMetadata, viewport };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import('@/messages/en.json')).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${libreBaskerville.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

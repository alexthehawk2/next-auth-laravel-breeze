/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useAuth } from "@/hooks/auth.tsx";
import ReduxProvider from "@/store/provider.tsx";
import Test from "@/components/test";
import { Provider } from "react-redux";
import store from "@/store";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { user, isLoading, isValidating } = useAuth({
  //   middleware: 'auth',
  //   redirectIfAuthenticated: '/',
  // })
  // console.log(isLoading, 'isLoading')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Test children={children}>
          </Test>
        </Provider>
      </body>
    </html>
  );
}

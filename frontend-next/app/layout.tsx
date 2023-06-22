"use client";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Hyperlocal" key="title" />
      </Head>
      <head>
        <title>Hyperlocal: Connect</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </Provider>
      </body>
    </html>
  );
}

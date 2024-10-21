import { RootProvider } from "../providers/RootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Blessed ",
    default: "Blessed Dashboard",
  },
};

const ttBluescreens = localFont({
  src: "../../public/fonts/TT_Bluescreens_Bold.woff",
  variable: "--font-tt-bluescreens",
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ttBluescreens.variable}`}>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

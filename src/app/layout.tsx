import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { RootProvider } from "../providers/RootProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Blessed",
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
      <body className={`${inter.className} bg-root-background`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

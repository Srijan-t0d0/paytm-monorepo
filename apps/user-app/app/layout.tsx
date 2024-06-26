import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import "./globals.css";
import { AppbarClient } from "./components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} dark:bg-gray-900 bg-[#ebe6e6]`}>
          <div className="min-w-screen min-h-screen ">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}

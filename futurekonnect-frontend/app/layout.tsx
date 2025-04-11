import { Montserrat } from 'next/font/google';
import './globals.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import Providers from './providers';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "FutureKonnect",
  description: "FutureKonnect - Connect with the future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
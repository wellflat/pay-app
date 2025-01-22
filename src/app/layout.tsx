import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Payment History",
  description: "payment history by your credit card",
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <html lang="ja">
      <SessionProvider>
        <body className={ "bg-gray-100 p-5" }>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}

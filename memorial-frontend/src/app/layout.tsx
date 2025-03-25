import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Memorial",
  description: "Honor and remember your loved ones",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}

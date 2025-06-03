import type { Metadata } from "next";
import "./globals.css";
import { DestinationProvider } from "./context/selectedDestinationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 min-h-screen">
        <DestinationProvider>{children}</DestinationProvider>
      </body>
    </html>
  );
}

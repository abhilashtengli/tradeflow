import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Trade Flow",
  description: "Trade flow is a web app which helps importers and exporters.",
  icons: [{ rel: "icon", url: "/trade_icon.png" }]

  // icons: {
  //   icon: [
  //     { url: "/trade_icon.png", sizes: "any" },
  //     { url: "/icon.svg", type: "image/svg+xml" },
  //   ],
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {children} 
      </body>
    </html>
  );
}

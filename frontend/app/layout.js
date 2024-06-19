import { Inter } from "next/font/google";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Streaming App",
  description: "Landing Page of the Streaming Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className="font-poppin-regular">
        {children}</body>
    </html>
  );
}

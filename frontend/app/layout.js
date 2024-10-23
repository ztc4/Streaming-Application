import { Inter } from "next/font/google";
import "./globals.css"
import Link from "next/link";

import Nav from "@/app/Components/Nav";
import Layout from "./landing/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Streaming App",
  description: "Landing Page of the Streaming Application",
};

function LayoutRoot({ children }) {


  return (
    <html lang="en">
      <body className="font-poppin-regular overflow-x-hidden bg-white dark:bg-dark-background w-screen">
        <Nav/>
        
        {children}
      </body>
    </html>
  );
}

export default LayoutRoot;
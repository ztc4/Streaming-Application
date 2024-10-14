import { Inter } from "next/font/google";
import "./globals.css"
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Streaming App",
  description: "Landing Page of the Streaming Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className="font-poppin-regular">
        {children}
        <footer className="w-full bg-[#050505] py-10 px-20 min-h-80 text-white font-poppin-medium flex justify-evenly gap-12 text-lg">
          <div id="About" className="flex  items-center flex-col">
            <p className=" text-4xl">About</p>
            <p className="text-center mt-3">Welcome to the platform, this <br></br> a personal project that between me and <br></br> two other developers</p>

          </div>
          <div id="PAGES" className="w-fit gap-12 grid justify-start content-start items-start grid-cols-2 md:grid-cols-3">
            <div id="Explore">
              <p className="text-2xl uppercase tracking-wide">Explore</p>
              {["Educational","Gaming","Trending"].map(current => <Link href={current.replace(/\s/g, "")} className="hover:text-blue" passhref><li>{current}</li></Link>)}

            </div>
            <div id="Home">
              <Link className="uppercase hover:text-blue tracking-wide text-2xl block" href="/">Home</Link>
              {["Our Vision","Your Voice","Trending"].map(current => <Link href={current.replace(/\s/g, "")} className="hover:text-blue" passhref><li>{current}</li></Link>)}

            </div>
            <div id="About">
              <p className="text-2xl uppercase tracking-wide">About</p>
              {["About Us","FAQ","Trending"].map(current => <Link href={current.replace(/\s/g, "")} className="hover:text-blue" passhref><li>{current}</li></Link>)}

            </div>
            <Link className="uppercase hover:text-blue tracking-wide text-2xl block" href="login">Login</Link>
            <Link className="uppercase hover:text-blue tracking-wide text-2xl block" href="signup">Signup</Link>
          </div>
          <div className="flex flex-col items-center">
            <Image
              height={40}
              width={40}
              className=" object-fill mx-auto text-white  "
              src="/icons/Logo.svg"
              alt="Logo"
            />
            <p className="uppercase  tracking-wide text-2xl">Creators</p>
            {[{name:"Zachary C", link:"https://www.hellozachary.dev"}].map(creator => (
              <a key={creator.name} className="hover:text-blue" href={creator.link} target="_blank" rel="noopener noreferrer">
                {creator.name}
              </a>
            ))}


          </div>
        </footer>
      </body>
    </html>
  );
}

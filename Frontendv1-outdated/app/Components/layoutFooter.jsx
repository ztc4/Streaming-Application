import Image from "next/image";
import Link from "next/link";


function LayoutFooter() {
    return ( 
        <footer className="w-full bg-[#050505] py-10 px-4 md:px-20 min-h-80 text-white font-poppin-medium flex justify-evenly flex-wrap gap-2 md:gap-12 md:text-lg">
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


     );
}

export default LayoutFooter;
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Nav() {
    const [mobileNavOpen, toggleNav] = useState(false)
    const toggleClick = ()=> toggleNav(current => !current)
    const pathname = usePathname()
    if(  pathname.includes("login") || pathname.includes("signup")){
        return (
            <Link href="/" className="flex items-center h-12 w-auto text-white fixed top-3 left-3  space-x-3 rtl:space-x-reverse" aria-label="Back to Home Page" passHref>
                <Image height={40} width={40} className="object-fill h-full rotate-180" src="/icons/landing/arrowRight.svg" alt="Arrow"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" >Home</span>
            </Link>
            )
    } else if(pathname.includes("dashboard")){ 
        return(<></>)
    }

    return ( 
        <nav className="bg-white/80 overflow-x-hidden  dark:bg-gray-100/90 flex fixed w-screen z-50 top-0 start-0 border-b min-h-fit border-gray-200">
            <div id="wrap" className=" max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center  space-x-3 rtl:space-x-reverse" passHref>
                    <Image height={40} width={40} className="object-fill h-full" src="/icons/Logo.svg" alt="Streaming Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Streaming</span>
                </Link>

                <button onClick={toggleClick}
                data-collapse-toggle="navbar-sticky" type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`items-center justify-between ${ mobileNavOpen ? "" :"hidden"} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50/50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {["explore","faq","about","feedback"].map(link => {
                            return (
                            <li key={link} className="block py-2 hover:text-blue font-medium duration-700 ">
                                <Link href={`/${link}`}>{link}</Link>
                            </li>
                            );})
                        }
                        {["login","signup"].map(link => {
                            return (
                            <li key={link} className="block py-2 md:hidden ">
                                <Link href={`/${link}`}>{link}</Link>
                            </li>
                            );})
                        }
                    </ul>
                </div>
                <Link href="/login" className="relative hidden md:inline-flex items-center px-11 py-2 h-fit overflow-hidden order-4  font-medium text-blue border-2 border-blue rounded-full hover:text-white group hover:bg-gray-50">      
                    <span className="absolute left-0 block w-full h-0 transition-all bg-blue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" alt="">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                    <span className="relative">Login</span>
                </Link>
            </div> 

        </nav>
     );
}

export default Nav;
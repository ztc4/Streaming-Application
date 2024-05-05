"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Button({visibility,text,svg,link}) {


    return ( 
        <Link
        href="/"
        passHref
        className={`w-full rounded-full flex bg-[#F8F8F8] justify-center items-center  gap-3 h-10 hover:z-10 duration-1000 hover:scale-110 cursor-pointer
        ${visibility
        ?"p-2  hover:bg-pink hover:bg-opacity-50"
        :"p-0 items-center"}
        `}
        >
        {/* ICON */}
        <div className={`bg-pink p-2  w-10 h-10 flex justify-center items-center rounded-full ${visibility ?"":""}`}>
            <Image 
            src={`/icons/dashboard/${svg}.svg`}
            height={5}
            width={5}
            className={`h-full w-full ${visibility ? "m-0":"ml-4"}` }
            alt="Button to Expand NavBar"/>
        </div>


        {/* TEXT */}
        <p className={`text-black w-3/5 font-poppin-light text-xs overflow-clip  duration-500 delay-500 my-auto ${visibility ? "opacity-100": "opacity-0 "}`}>{text}</p>

        </Link>
     );
}

export default Button;
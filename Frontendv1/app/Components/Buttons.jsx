"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

export function NavButton({
  visibility,
  text,
  svg,
  link,
}) {
  
  // 
  return (
    <Link href={link} passHref
      className={`w-full rounded-full flex bg-[#F8F8F8] justify-center items-center  gap-3 h-10 hover:z-10 duration-1000 hover:scale-110 cursor-pointer
      ${visibility? "p-2  hover:bg-pink hover:bg-opacity-50": "p-0 items-center"}`}
    >
      <div className={`bg-pink p-2  w-10 h-10 flex justify-center items-center rounded-full ${visibility ? "" : ""}`}>
        <Image
          src={`/icons/dashboard/${svg}.svg`} height={5} width={5}
          className={`h-full w-full ${visibility ? "m-0" : "ml-4"}`}
          alt="Button to Expand NavBar"
        />
      </div>
      <p className={`text-black w-3/5 font-poppin-light text-xs overflow-clip  duration-500 delay-500 my-auto ${visibility ? "opacity-100" : "opacity-0 "}`}>
       <span className={`overflow-clip duration-700 ${visibility ? "!delay-75 visible" : " !delay-700  hidden"} `}>{text}</span>
      </p>
    </Link>
  );
}

export function ExploreButton({text = "Trending", image = "trending"}){
  return (
    <button className="flex  bg-white text-black dark:bg-white dark:text-black [&>*]:text-[18px] 2xl:[&>*]:text-xl 2xl:h-16 hover:bg-slate-200 w-fit h-fit duration-1000 flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
      <Image
        className=""
        height={25}
        width={25}
        src={`/icons/landing/${image}.svg`}
      />
      <p>{text}</p>
      <Image
        className="ml-4"
        height={25}
        width={25}
        src="/icons/landing/Arrow.svg"
      />
  </button>
  )
}
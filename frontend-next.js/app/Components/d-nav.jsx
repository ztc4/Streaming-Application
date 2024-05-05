"use client";
import Image from "next/image";
import { useState } from "react";
import NavButton from "@/app/Components/d-button";
import navData from "@/app/data/dashboardNav";

function Nav() {
  const [loggedIn, setLogin] = useState(true);
  const [toggle, setToggle] = useState(true);
  function toggleNav() {
    setToggle((current) => !current);
  }
  const { links1, links2, links3 } = navData;
  console.log(links1);
  return (
    <>
      {/* OPEN CLOSE MENU */}

      <button
        onClick={toggleNav}
        aria-label="Open the Nav Menu"
        className={`delay-700flex justify-center items-center cursor-pointer sm:hidden size-7 top-5 z-50  absolute right-5
        ${toggle && "hidden"}`}
      >
        <Image
          height={20}
          width={20}
          className="size-10"
          alt=""
          src="/icons/dashboard/menu.svg"
        />
      </button>

      <button
        aria-label="Expand Menu Button"
        onClick={toggleNav}
        className={`border-black border-2 flex justify-center items-center rounded-full p-2 absolute z-50 top-10 size-10  ${
          toggle ? "left-44" : "sm2:hidden    sm:left-20"
        }`}
      >
        <Image
          // Corrected onClick syntax for React
          width={8}
          height={8}
          src="/icons/dashboard/arrow-nav.svg"
          className={`object-fill z-10 duration-500 ${toggle && "rotate-180"}`}
          alt="Button to Expand NavBar"
        />
      </button>

      <div
        className={`bg-[#ffffff]  py-4 max-h-screen z-10 visible hover:overflow-y-auto  flex flex-col rounded-r-xl !duration-1000  drop-shadow-md gap-8 relative  text-white font-haskoy-regular ${
          toggle
            ? " min-w-fit px-6  w-36 block"
            : " sm2:opacity-0 sm2:pointer-events-none  sm:px-6  w-0  sm:w-24"
        }`}
      >
        {/* <!-- Header --> */}

        <div className="!duration-500">
          {/* LOGO */}
          <Image
            className={`mx-auto duration-1000 h-24 w-24 delay-500 ${
              !toggle && "h-20 w-20"
            }`}
            src="/icons/Logo.svg"
            height={50}
            width={50}
            alt="Logo"
          />
          <div className="hover:over">
            <div
              className={`text-sm text-center text-black !font-poppin-medium overflow-clip delay-500 duration-500 ${
                toggle ? "relative opacity-100" : "opacity-0"
              }`}
            >
              <p>USERNAME</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {links1.map((_) => (
              <NavButton
                key={_.text}
                link={_.link}
                text={_.text}
                svg={_.svg}
                visibility={toggle}
              />
            ))}
          </div>

          <div className=" h-[2px] my-2 bg-black opacity-35"> </div>

          {/* <!-- Account Related  --> */}

          <div className="flex w-full flex-col gap-2">
            {links2.map((_) => (
              <NavButton
                key={_.text}
                link={_.link}
                text={_.text}
                svg={_.svg}
                visibility={toggle}
              />
            ))}
          </div>
          <div className=" h-[2px] my-2 bg-black opacity-35"> </div>

          {/* <--- SETTINGS --->*/}
          <div className="flex w-full mt-auto flex-col gap-2">
            {links3.map((_) => (
              <NavButton
                key={_.text}
                link={_.link}
                text={_.text}
                svg={_.svg}
                visibility={toggle}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;

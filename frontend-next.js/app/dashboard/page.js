"use client";
import Image from "next/image";
import Card from "@/app/Components/card";
import { useState } from "react";
import Nav from "../Components/d-nav";
import toggleSearch from "@/app/Components/d-toggleSearch";

function Content() {
  const [searchActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);

  const handleActive = () => {
    setActive((current) => !current);
  };
  function toggleNav() {
    setToggle((current) => !current);
  }

  return (
    <>
      <div className=" py-1 sm:py-4 h-screen overflow-y-hidden   duration-1000 min-w-fit   text-center flex-grow bg-background">
        {/* <!-- Search && Filter  --> */}
        <header
          className="sticky border-b-2 border-opacity-10 border-b-black
          grid items-center justify-center grid-cols-5 sm2:grid-cols-6 gap-2 p-2 sm:p-4"
        >
          <p className="hidden sm:block"></p>
          <input
            placeholder="Search..."
            type="text"
            className={`order-2 col-span-3 sm2:col-span-3 sm:block text-black h-10 opacity-90 
            focus:opacity-100  placeholder:text-clip outline-none pl-4 sm:px-12  drop-shadow-md rounded-full ${
              searchActive ? "" : "hidden"
            }`}
          />

          {!searchActive ? (
            <>
              <button className="col-span-1  sm:hidden flex justify-center items-center   order-1">
                <Image
                  height={20}
                  width={20}
                  className="size-10"
                  alt="logo"
                  src="/icons/Logo.svg"
                />
              </button>
              <button
                aria-label="Click to start searching"
                onClick={handleActive}
                className="col-span-3  sm:hidden flex justify-end pr-3   order-2"
              >
                <Image
                  height={20}
                  width={20}
                  className="size-8 my-1"
                  alt=""
                  src="/icons/dashboard/Search.svg"
                />
              </button>
            </>
          ) : (
            <button
              onClick={handleActive}
              className="bg-[#F4F4F4] order-1  sm:hidden rounded-full p-2 flex items-center justify-center"
            >
              <Image
                height={20}
                width={20}
                className="size-5"
                alt="close the search arrow"
                src="/icons/dashboard/arrow-search.svg"
              />
            </button>
          )}
          <div
            className={`order-3 col-span-1 p-3 ${
              searchActive ? "block" : "hidden sm:block"
            }`}
          >
            <Image
              width={20}
              height={20}
              src="/icons/dashboard/Filter.svg"
              className={`size-10 border-1 rounded-md hover:bg-gray-300 duration-500 cursor-pointer p-1  sm:block`}
              alt="Button to Expand NavBar"
            />
          </div>
        </header>

        {/* <!-- ITEMS --> */}
        <div className=" flex  sm:w-[90vw]  overflow-y-scroll h-screen gap-2 flex-row flex-wrap justify-center p-2 sm:p-4 pt-6  ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}

export default Content;

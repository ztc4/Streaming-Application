"use client";
import Image from "next/image";
import Link from "next/link";
import VisionCard from "@/app/Components//vision-card";
import VisionMore from "./Components/l-vision-more";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden items-center justify-between">
      <section className="h-screen w-screen px-10 relative">
        <header className="flex z-30 text-xl flex-row relative justify-between font-poppin-bold h-36 items-center">
          <Image
            height={40}
            width={40}
            className="object-fill h-full"
            src="/icons/Logo.svg"
            alt="Logo"
          />
          <nav className="text-[#091227] flex flex-row gap-4">
            <Link href="/explore">Explore</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
            <Link href="/feedback">Feedback</Link>
          </nav>
          <Link href="/login" passHref>
            <button className="px-8 z-30 py-2 rounded-sm bg-blue tracking-wide text-white bg-blue-500">
              Login
            </button>
          </Link>
        </header>

        {/* INFO */}
        <div className="z-20 relative opacity-100 w-1/2 mt-10">
          <h1 className="font-poppin-bold text-black text-5xl">
            Click <br /> Watch, Chat: <br />
            Dive into the Conversation
          </h1>
          <p className="text-[16px] mt-4 font-poppin-medium text-black">
            Discover, discuss, and learn on our interactive platform. Click to
            explore captivating content, watch engaging videos, and chat with
            fellow enthusiasts. Join the conversation and broaden your knowledge
            in a vibrant community.
          </p>
          <div className="bg-[#B0BAC3] bg-opacity-60 rounded-3xl border-[1px] border-black border-opacity-40 flex gap-4 px-4 py-2 text-base z-20 relative justify-between flex-row w-4/5 mt-4">
            <input
              type="text"
              name="email"
              className="font-poppin-regular outline-none placeholder:text-black placeholder:text-opacity-60 bg-transparent w-4/5"
              placeholder="Enter email to start signup now"
            />
            <button className="bg-yellow font-poppin-medium py-3 px-8 border-[1px] border-black border-opacity-50 rounded-3xl">
              Signup
            </button>
          </div>
          <p className="uppercase text-center text-xl mt-8 text-black">
            or explore
          </p>
          <div className="flex flex-col justify-center items-center mt-1 gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <button className="flex bg-white flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
                <Image
                  className=""
                  height={15}
                  width={15}
                  src="/icons/landing/trending.svg"
                />
                <p className="text-[18px]">Trending</p>
                <Image
                  className="ml-4"
                  height={20}
                  width={20}
                  src="/icons/landing/Arrow.svg"
                />
              </button>
              <button className="flex bg-white flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
                <Image
                  className=""
                  height={15}
                  width={15}
                  src="/icons/landing/book.svg"
                />
                <p className="text-[18px]">Educational</p>
                <Image
                  className="ml-4"
                  height={20}
                  width={20}
                  src="/icons/landing/Arrow.svg"
                />
              </button>
            </div>
            <button className="flex bg-white flex-row justify-center items-center px-5 w-fit h-fit py-2 rounded-3xl gap-1">
              <Image
                className=""
                height={15}
                width={15}
                src="/icons/landing/game.svg"
              />
              <p className="text-[18px]">Gaming</p>
              <Image
                className="ml-4"
                height={20}
                width={20}
                src="/icons/landing/Arrow.svg"
              />
            </button>
          </div>
        </div>

        {/* background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-5 left-10 -rotate-45 bg-[#07D2FB] h-[35rem] w-[20rem] rounded-full blur-[180px] bg-opacity-80 z-10"></div>
          <div className="absolute top-5 left-1/4 bg-[#21FCC7] h-[35rem] w-[20rem] rounded-full blur-[120px] bg-opacity-80 z-10"></div>
          <div className="absolute bottom-10 right-28 bg-[#3E4FEC] size-[35rem] rounded-full blur-[170px] bg-opacity-80 z-10"></div>
        </div>
      </section>
      <section className="h-screen bg-white w-screen relative flex flex-col justify-evenly overflow-hidden">
        <h2 className="text-center  font-poppin-bold my-8 text-3xl">
          Our Vision
        </h2>
        <div className="grid grid-cols-3 gap-12 px-24 justify-center">
          <VisionCard
            header="Upload Video"
            text="Our unique solution to allow for communication between users. Instead of the overused comment system, we incorporate more of a live chat feature that empowers users to educate each other and allows for more activity on recent videos"
          />
          <VisionCard
            header="Upload Video"
            text="Our unique solution to allow for communication between users. Instead of the overused comment system, we incorporate more of a live chat feature that empowers users to educate each other and allows for more activity on recent videos"
          />
          <VisionCard
            header="Upload Video"
            text="Our unique solution to allow for communication between users. Instead of the overused comment system, we incorporate more of a live chat feature that empowers users to educate each other and allows for more activity on recent videos"
          />
        </div>
        <footer className="h-1/5 w-full mt-8 px-24  flex items-center bg-[#D9D9D9] bg-opacity-20 ">
          <div className="w-3/4 flex flex-row ">
            <VisionMore />
            <VisionMore />
            <VisionMore />
          </div>

          <Link className="w-1/4 px-8" href="/login" passHref>
            <button className="px-8 py-2 z-30 rounded-md justify-center items-center flex flex-row bg-blue tracking-wide text-white bg-blue-500">
              <p>Learn More About</p>
              <Image
                className="ml-4 text-white"
                height={30}
                width={40}
                src="/icons/landing/arrowRight.svg"
              />
            </button>
          </Link>
        </footer>
      </section>
      <section className="h-screen bg-white w-screen relative flex flex-col justify-evenly overflow-hidden">
        <div className="px-24 flex flex-col">
          <h2 className="font-poppin-bold text-4xl text-center">
            Empower Your Voice, Build a Community
          </h2>
          <p className="text-center mt-4 text-[#161C2D] text-lg font-poppin-medium">
            With the ability to upload and view videos, you can easily take
            advantages of <br/> our features to have live discussion with others in
            the community
          </p>
        </div>

        <div className="flex flex-row h-3/5 px-36">
          <div id="image" className="w-1/2 bg-red-600"></div>
          <div id="list" className="1/2">
            <div id="1" className="flex gap-8 pl-4 flex-row">
              <div className="bg-orange  size-10 rounded-full h-10 flex justify-center items-center text-white">
                <p>1</p>
              </div>
              <div clas>
                <p className="h-10 text-2xl font-poppin-semibold">Create Your Account</p>
                <p className="font-poppin-medium text-[#161C2D]">
                  Unlock the Power to Support Fellow Users: Create Your Account
                  Today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

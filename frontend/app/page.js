"use client";
import Image from "next/image";
import Link from "next/link";

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
              <Image className="" height={15} width={15} src="/icons/landing/trending.svg" />
              <p className="text-[18px]">Trending</p>
              <Image className="ml-4" height={20} width={20} src="/icons/landing/Arrow.svg" />
            </button>
            <button className="flex bg-white flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
              <Image className="" height={15} width={15} src="/icons/landing/book.svg" />
              <p className="text-[18px]">Educational</p>
              <Image className="ml-4" height={20} width={20} src="/icons/landing/Arrow.svg" />
            </button>
          </div>
          <button className="flex bg-white flex-row justify-center items-center px-5 w-fit h-fit py-2 rounded-3xl gap-1">
            <Image className="" height={15} width={15} src="/icons/landing/game.svg" />
            <p className="text-[18px]">Gaming</p>
            <Image className="ml-4" height={20} width={20} src="/icons/landing/Arrow.svg" />
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
    <section className="h-screen bg-white w-screen overflow-hidden"></section>
  </main>
  );
}

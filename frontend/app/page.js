"use client";
import Image from "next/image";
import Link from "next/link";
import VisionCard from "@/app/Components//vision-card";
import VisionMore from "./Components/l-vision-more";
import EmpowerItem from "./Components/empowerItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-dark-background overflow-x-hidden  items-center justify-between">
      <section className="min-h-fit w-screen px-10 relative">
        <header className="flex z-30 text-xl  flex-row relative justify-between font-poppin-bold h-36 items-center">
          <Image
            height={40}
            width={40}
            className="object-fill h-full"
            src="/icons/Logo.svg"
            alt="Logo"
          />
          <nav className="text-[#091227] hidden 2xl:text-3xl sm:flex flex-row gap-4 2xl:gap-16">
            <Link href="/explore">Explore</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
            <Link href="/feedback">Feedback</Link>
          </nav>
          <Link href="/login" class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-blue border-2 border-blue rounded-full hover:text-white group hover:bg-gray-50" passHref>      
              <span className="absolute left-0 block w-full h-0 transition-all bg-blue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" alt=""><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Login</span>
            
          </Link>
          
        </header>

        {/* INFO */}
        <div className="z-20 md:ml-24 2xl:ml-96 2xl:mt-40 text-white    h-full relative opacity-100 w-full max-w-[1200px] my-auto">
          <h1 className="font-poppin-bold text-black dark:text-white text-5xl 2xl:text-7xl 3xl:text-[110px] ">
            Click <br /> Watch, Chat: <br />
            Dive into the Conversation
          </h1>
          <p className="text-[16px] mt-4 2xl:mt-12 dark:text-white  font-poppin-medium 2xl:text-2xl text-black">
            Discover, discuss, and learn on our interactive platform. Click to
            explore captivating content, watch engaging videos, and chat with
            fellow enthusiasts. Join the conversation and broaden your knowledge
            in a vibrant community.
          </p>
          <div className="bg-[#B0BAC3] bg-opacity-60 rounded-3xl xl:mt-12 border-[1px] border-black border-opacity-40 flex gap-4 px-4 py-2 text-base z-20 relative justify-between flex-row w-full md:w-4/5 mt-4">
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
          <p className="uppercase text-center text-xl 2xl:text-2xl mt-8 text-black">
            or explore
          </p>

          <div className="flex flex-col justify-center  items-center my-4 gap-2">
            <div className="flex flex-col dark:[&>*]:text-black dark:[&>*]:bg-white 2xl:[&>*]:p-10 [&>*]:text-[18px] 2xl:[&>*]:text-2xl  2xl:[&>*]:h-24 text-black [&>*:hover]:bg-slate-200 [&>*:hover]:text-blue [&>*]:duration-1000 md:flex-row gap-2">
              <button className="flex  bg-white flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
                <Image
                  className=""
                  height={25}
                  width={25}
                  src="/icons/landing/trending.svg"
                />
                <p>Trending</p>
                <Image
                  className="ml-4"
                  height={25}
                  width={25}
                  src="/icons/landing/Arrow.svg"
                />
              </button>
              <button className="flex bg-white flex-row justify-center items-center px-5 py-2 rounded-3xl gap-1">
                <Image
                  className=""
                  height={25}
                  width={25}
                  src="/icons/landing/educational.svg"
                />
                <p>Educational</p>
                <Image
                  className="ml-4"
                  height={25}
                  width={25}
                  src="/icons/landing/Arrow.svg"
                />
              </button>
            </div>
            <button className="flex bg-white text-black dark:bg-white dark:text-black flex-row justify-center items-center [&>*]:text-[18px] 2xl:[&>*]:text-2xl 2xl:h-24 hover:bg-slate-200  px-5 w-fit h-fit py-2 duration-1000 rounded-3xl gap-1">
              <Image
                className=""
                height={25}
                width={25}
                src="/icons/landing/game.svg"
              />
              <p >Gaming</p>
              <Image
                className="ml-4"
                height={25}
                width={25}
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
      <section className="min-h-screen mt-20 dark:text-white bg-white dark:bg-dark-background w-screen relative flex flex-col justify-evenly overflow-hidden">
        <h2 className="text-center   font-poppin-bold my-8 text-4xl 2xl:text-7xl">
          Our Vision
        </h2>
        <div className="grid md:grid-cols-3 flex-shrink-0 gap-12 py-4 px-4 md:px-24 justify-center">
          <VisionCard
            color={1}
            icon="cloud"
            header="Upload Video"
            text="Our unique solution to allow for communication between users. Instead of the overused comment system, we incorporate more of a live chat feature that empowers users to educate each other and allows for more activity on recent videos"
          />
          <VisionCard
            color={2}
            icon="chat"
            header="Interact With Your Community"
            text="Our unique solution to allow for communication between users. Instead of the overused comment system, we incorporate more of a live chat feature that empowers users to educate each other and allows for more activity on recent videos"
          />
          <VisionCard
            color={3}
            icon="share"
            header="Share With Others"
            text="Welcome others to the community to share their experience by informing them of the platform, to allow a better discussion on the platform"
          />
        </div>
        <footer className="min-h-[220px] w-full mt-8 py-4 px-24 flex-col md:flex-row flex items-center bg-[#D9D9D9] bg-opacity-20 ">
          <div className="w-screen px-8 md:px-0 md:w-3/4 flex flex-row gap-6  ">
            <VisionMore enable={true} />
            <VisionMore />
            <VisionMore />
          </div>

          <Link className="w-screen md:w-1/4 px-8 mt-4" href="/login" passHref>
            <button className="px-8 py-2 z-30 h-16 ml-auto rounded-md justify-center items-center flex flex-row bg-blue tracking-wide hover:bg-black duration-1000 text-white bg-blue-500">
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
      <section className="min-h-screen md:h-screen py-8 dark:bg-dark-background dark:text-white bg-white w-screen relative flex flex-col justify-evenly overflow-hidden">
        <div className=" px-4 md:px-24 flex flex-col">
          <h2 className="font-poppin-bold text-4xl 2xl:text-6xl text-center">
            Empower Your Voice, Build a Community
          </h2>
          <p className="text-center mt-4 text-[#161C2D] dark:text-white text-opacity-70  text-sm md:text-lg 2xl:text-2xl font-poppin-medium">
            With the ability to upload and view videos, you can easily take
            advantages of <br/> our features to have live discussion with others in
            the community
          </p>
        </div>

        <div className="flex flex-col md:flex-row relative mt-4 h-3/5 px-10 md:px-6">
          <div id="image" className="w-full md:w-1/2 min-h-[400px]  relative">
            <Image alt="Empower Placeholder Image" height={484} width={357} src="/images/landing-empower.jpg" className=" h-full 2xl:h-5/6 w-full md:w-8/12 rounded-3xl right-5 md:right-10 absolute z-10"/>
            <div className="bg-orange h-full 2xl:h-5/6 rounded-3xl w-full md:w-8/12 mr-auto absolute top-10 right-0 z-0">
            </div>
          </div>

          <div id="list" className=" flex flex-col gap-4 min-h-fit">
            <EmpowerItem/>
            <EmpowerItem number={2} header="Contribute Your Ideas" paragraph="Take the Leap: Share Your First Video and 
            Seek Guidance from Our Community."/>
            <EmpowerItem  number={3} header="Share Your Video" paragraph="Maximize Your Video's Reach with Our Feature-Rich Platform."/>
            
          </div>
        </div>
      </section>
      <section className=" md:px-24 md:py-20 w-full min-h-fit">
        <div id="signUpNow" className=" w-full h-[362px] text-white px-40 justify-between flex flex-col md:flex-row py-20 rounded-3xl shadow-2xl">
          <div className="flex flex-col justify-center">
            <p className="font-poppin-semibold text-4xl">Sign Up Now!</p>
            <ul className="mt-6 flex flex-row flex-wrap gap-4 [&>*]:ml-8  text-[24px] list-disc tracking-wide  font-poppin-medium">
              <li>Communicating with like minded individuals </li>
              <li>Start posting videos that benefit everyone</li>
              <li>Access your information from anywhere</li>
              <li>Get help from other users</li>
            </ul>
          </div>
          <button className="bg-blue h-12 min-w-fit hover:bg-black duration-700 hover:border-white hover:border-2 shadow-lg rounded-xl p-10 px-20 flex flex-row justify-center my-auto items-center font-poppin-semibold text-2xl">
            <p>Sign up Now</p>
            <Image
                  className=" text-white ml-4 size-12"
                  height={25}
                  width={25}
                  src="/icons/landing/arrowRight.svg"
                />

          </button>

        </div>
      </section>
    </main>
  );
}

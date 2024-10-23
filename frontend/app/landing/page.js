"use client";
import Image from "next/image";
import Link from "next/link";
import VisionCard from "@/app/Components/visionCard";
import VisionMore from "@/app/Components/l-vision-more";
import EmpowerItem from "@/app/Components/empowerItem";
import { ExploreButton } from "@/app/Components/Buttons";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-y-hidden flex-col bg-white dark:bg-dark-background overflow-x-hidden  items-center justify-between">
      <section className="min-h-fit overflow-hidden w-screen px-10 relative">

        {/* INFO */}
        <div className="z-20 md:ml-24 3xl:ml-96 2xl:mt-40 text-white mt-32   h-full relative opacity-100 w-full max-w-screen-xl my-auto">
          <h1 className="font-poppin-bold text-black dark:text-white text-5xl 3xl:text-7xl 3xl:text-[110px] ">
            Click <br /> Watch, Chat: <br />
            Dive into the Conversation
          </h1>
          <p className="text-[16px] mt-4 3xl:mt-12 dark:text-white md:w-1/2  font-poppin-medium 3xl:text-xl text-black">
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
            <div className="flex flex-col justify-center items-center  text-black   md:flex-row gap-2">
              <ExploreButton/>
              <ExploreButton text="Educational" image="educational"/>
            </div>
              <ExploreButton text="Gaming" image="game"/>
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

          <div id="list" className=" flex flex-col mt-12 md:mt-0 gap-4 min-h-fit">
            <EmpowerItem/>
            <EmpowerItem number={2} header="Contribute Your Ideas" paragraph="Take the Leap: Share Your First Video and 
            Seek Guidance from Our Community."/>
            <EmpowerItem  number={3} header="Share Your Video" paragraph="Maximize Your Video's Reach with Our Feature-Rich Platform."/>
            
          </div>
        </div>
      </section>
      <section className=" md:px-24 md:py-20 px-6 py-6 max-h-fit  w-full min-h-fit">
        <div id="signUpNow" className=" w-full max-h-[362px] text-white  px-6 md:px-40 justify-between flex flex-col md:flex-row py-8 md:py-20 rounded-3xl shadow-2xl">
          <div className="flex flex-col justify-center">
            <p className="font-poppin-semibold text-4xl">Sign Up Now!</p>
            <ul className="mt-6 flex flex-row flex-wrap gap-1 md:gap-4 [&>*]:ml-8  md:text-[24px] list-disc tracking-wide  font-poppin-medium">
              <li>Communicating with like minded individuals </li>
              <li>Start posting videos that benefit everyone</li>
              <li>Access your information from anywhere</li>
              <li>Get help from other users</li>
            </ul>
          </div>
          <button className="bg-blue md: h-12 min-w-fit mt-8   hover:bg-black duration-700 hover:border-white hover:border-2 shadow-lg rounded-xl py-4 md:py-10 md:px-20 flex flex-row justify-center md:my-auto items-center font-poppin-semibold text-lg md:text-2xl">
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

import ExploreButton from "@/app/components/ExploreButton";
import VisionComponent from "@/app/components/VisionComponent";
import EmpowerItem from "@/app/components/EmpowerItem";
import { ChevronRight } from "lucide-react";
import { MoveRight } from 'lucide-react';
import Image from "next/image";
import Rankings from "@/app/components/ui/PopularTable";
export default function Home() {

    return(
        <div className={"w-screen  overflow-hidden mx-auto"}>

            <div className="  md:px-12 pb-28 pt-40 w-full max-w-screen-2xl mx-auto  bg-landing ">
                <div className="flex flex-col   gap-4 w-full md:w-7/12 max-w-fit">
                    <div className="bg-gradient-blue-reverse md:px-4 py-2 w-9/12 mb-4 md:rounded-l-full ">
                        <div className="bg-gradient-blue-reverse px-12 md:px-8 py-3 w-full md:w-8/12  md:rounded-l-full">
                            <p className="md:text-xl overflow-visible">Dive into the Conversation</p>
                        </div>
                    </div>
                    <h1 className=" text-2xl md:text-6xl px-12 md:px-0 uppercase font-extrabold  ">Click, Watch, Chat:</h1>
                    <div className="flex flex-col px-12 md:px-0 w-full md:w-10/12 gap-6">
                        <p className="font-medium ">Discover, discuss, and learn on our interactive platform.
                            Click to explore captivating content, watch engaging videos, and chat with fellow
                            enthusiasts. Join the conversation and broaden your knowledge in a vibrant community.</p>
                        <form className={"w- h-12 rounded-full flex bg-input px-2 py-1 gap-6 justify-between "}>
                            <input
                                className="bg-transparent outline-1  border-none  autofill:pl-8 autofill:outline-none rounded-2xl focus:placeholder:px-8 duration-700  py-3 px-6 outline  focus:text-text text-text-secondary-2 autofill:shadow-none   outline-none ml-8 w-full"
                                type={"text"} placeholder=" Start Signup! Enter Your Email... "/>
                            <button className=" bg-gradient-yellow rounded-full px-4 w-fit"> Signup</button>
                        </form>
                        <p className={"uppercase mx-auto w-fit text-xl my-2 font-semibold"}>Or Explore</p>
                        <div className={"flex flex-row flex-wrap min-h-fit gap-3 z-40 justify-center self-center"}>
                            <ExploreButton key="Trending" href={"/trending"} text={"Trending"} icon={"fire"}/>
                            <ExploreButton key="Gaming" href={"/trending"} text={"Gaming"} icon={"headset"}/>
                            <ExploreButton key="Education" href={"/trending"} text={"Education"} icon={"book"}/>
                        </div>
                    </div>

                </div>
            </div>
            <div className=" px-12 py-16 relative  " >
                <div className="absolute inset-0  bg-cross-pattern bg-repeat opacity-100"></div>
                <div className={"flex flex-col items-center"}>
                    <h2 className="text-5xl font-bold ">The Vision</h2>
                    <p className="text-lg max-w-[30rem] text-text-secondary text-center">Our website was built in order to build a community
                        that can share content and discuss content with others!</p>
                </div>
                <div className={"flex flex-col md:flex-row justify-center mt-8 gap-4"}>
                    <VisionComponent key="Upload" header={"Upload"}
                                     paragraph={"Our site was created to empower individuals to share their unique stories and expertise through the upload of videos."}/>
                    <VisionComponent key="Interact" header={"Interact"}
                                     paragraph={"Our site was created to empower individuals to share their unique stories and expertise through the upload of videos."}/>
                    <VisionComponent key="Share" header={"Share"}
                                     paragraph={"Welcome others to the community to share their experience by informing them of the platform, to allow a better discussion on the platform"}/>
                </div>
            </div>
            <div className={"bg-secondary flex flex-col justify-center px-2 gap-1 items-center h-[208px]"}>
                <div className={"flex flex-row items-center gap-2 hover:cursor-pointer"}>
                    <div className={"text-xl text-text-primary "}>Learn More About</div>
                    <ChevronRight className={" bg-b-main text-b-secondary  rounded-lg"} />
                </div>
                <p className={"text-lg text-text-secondary text-center"}>Lorem ipsum is here for the start of this application. This is the beginner text for Right now</p>
            </div>
            <div className=" px-4 md:px-12 py-16 relative">
                <div className={"flex flex-col gap-2 items-center"}>
                    <h2 className="text-5xl font-medium text-center ">Empower Your Voice</h2>
                    <p className="text-lg max-w-[45rem] text-center text-text-secondary">With the ability to upload and view videos, you can
                        easily take advantages of our features to have live discussion with others in the community</p>
                </div>
                <div aria-hidden={true} className={" absolute bottom-[10%] right-[10%] z-0  text-8xl uppercase opacity-5 font-black"}>Get
                    Started
                </div>
                <div className={" max-w-screen-lg relative  mx-auto"}>
                    <div
                        className={" mt-4 relative items-center  min-w-48 min-h-48  border-dotted border-2 grid grid-cols-1 md:grid-cols-2 gap-8 p-[5%]"}>
                        <div className=" relative w-4/5 px-auto mx-auto aspect-[4/5] ">
                            <Image
                                src={"/images/landing-empower.jpg"}
                                alt={"Empower Image"}
                                className={"  rounded-2xl  z-10 "}
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                            <div className={"size-full absolute rounded-2xl left-6 top-6 bg-gradient-orange"}/>
                        </div>
                        <div className={"flex flex-col gap-3 justify-between"}>
                            <EmpowerItem header="Create Your Account"
                                         paragraph="Unlock the Power to Support Fellow Users: Create Your Account Today."
                                         number={1}/>
                            <EmpowerItem header="Contribute Your Ideas"
                                         paragraph="Take the Leap: Share Your First Video and Seek Guidance from Our Community."
                                         number={2}/>
                            <EmpowerItem header="Share Your Video"
                                         paragraph="Maximize Your Video's Reach with Our Feature-Rich Platform."
                                         number={3}/>
                        </div>
                    </div>
                    <button
                        className="flex ml-auto flex-row py-2 px-3 pl-12 gap-3 justify-center hover:cursor-pointer items-center mt-2 bg-gradient-orange">
                        <span className={"cursor-pointer"}>Get Started</span>
                        <span><MoveRight/></span>
                    </button>
                </div>
                {/*<div className={" absolute bottom-[10%] right-[10%] z-0  text-8xl uppercase opacity-5 font-black"}>Get*/}
                {/*    Started*/}
                {/*</div>*/}
            </div>
            <div className={" px-2 md:px-12 py-16"}>
                <div className={"max-w-screen-2xl mx-auto max-h-fit p-0 "}>
                    <h3 className={"min-h-1/6 max-h-fit border-2 rounded-lg border-b-0 text-orange border-orange border-dotted text-center"}>Popular in the Community!</h3>
                    <Rankings/>

                </div>
            </div>
        </div>
    )
}
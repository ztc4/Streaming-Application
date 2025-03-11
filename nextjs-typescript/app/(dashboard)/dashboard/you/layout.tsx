import React from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";


function getServer(){
    const response = axios.get("http://localhost:8080/api/v1/search/user?")
}

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"flex flex-col w-full h-full pt-12  px-8 cursor-default items-center"}>
            <section className={" flex flex-col sm:flex-row  gap-4"}>
                <div className={"h-[200px] w-[200px] mx-auto  sm:h-full  aspect-1 "}> {/* */}
                    <Image
                        src={null || "/Images/ProfileFallbackImage.svg"}
                        alt={"Username Profile Image"}
                        width={200}
                        height={200}
                        className={"object-cover object-center bg-black rounded-full" +
                            ""}

                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-4xl uppercase italic"}>@Username</h1>
                    <p className={"font-bold text-2xl"}>Subscribers &#x2022; <span className={"font-medium"}>320</span>
                    </p>
                    <div className={" flex flex-row gap-4 max-w-[400px] pl-2 "}>
                        <p
                            className={"flex h-fit w-fit flex-col-reverse gap-[-6px] mt-1  text-2xl font-bold bg-yellow-200 justify-center items-center *:-m-2 *:-rotate-90"}
                            aria-label="About"
                        >
                            <span aria-hidden="true">A</span>
                            <span aria-hidden="true">b</span>
                            <span aria-hidden="true">o</span>
                            <span aria-hidden="true">u</span>
                            <span aria-hidden="true">t</span>
                        </p>
                        <div className={"flex flex-col gap-2"}>
                            <p
                                className={"cursor-default"}
                                title="User Personal Description">Lorem ipsum dolor sit amet consectetur. Varius varius
                                consectetur diam ultrices interdum
                                egestas non fusce aliquet. Iaculis lectus elementum in condimentum eget ullamcorper sit
                                justo. Ut nec.</p>
                            <div
                                className={" grid grid-cols-2 gap-2 *:border-background-accent-blue *:py-1 *:font-medium *:text-lg *:rounded-full"}>
                                <button
                                    className={" text-text-accent-blue border-2 hover:bg-background-accent-blue duration-500 hover:text-white"}
                                    aria-label="Linked In"> LinkedIn
                                </button>
                                <Link href={"/dashboard/manage"} className={"text-white  duration-500 bg-background-accent-blue"}>Manage Videos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {children}
        </div>
    )
}
import Image from "next/image";
import SignupForm from "@/app/components/ui/SignupForm";
import Link from "next/link";
import React from "react";

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"w-screen  h-screen flex justify-center items-center overflow-x-hidden"}>
            <div
                className="   h-full lg:h-[1024px] max-h-[700px] relative  w-full 2xl:max-w-screen-2xl border-0 md:p-4  2xl:border-2 border-dotted grid grid-cols-1 md:grid-cols-2  ">
                <div className={"relative hidden md:block overflow-hidden"}>
                    <Image

                        className={" rounded-2xl hidden  md:block"}
                        src={"/Images/Signup.png"}
                        objectFit="cover"
                        priority
                        alt={"Login Image"}
                        layout="fill"/>
                    <div
                        className="absolute hidden  md:block top-0 left-0 w-full h-full bg-black opacity-60 rounded-2xl"/>
                    <div className="absolute bottom-0 rotate-180 w-10/12 -left-10 h-2/3 bg-transparent rounded-2xl">
                        <Image
                            className={" rounded-2xl"}
                            src={"/Images/SignupBlob.svg"}

                            fill={true}
                            priority
                            alt={"Login Image"}
                        />
                    </div>


                </div>
                <div className=" absolute w-full h-72  top-0   md:hidden rounded-2xl">
                    <Image
                        className="rounded-2xl  h-96"
                        src={"/Images/SignupBlob.svg"}
                        fill={true}


                        priority
                        alt={"Login Image"}
                    />
                </div>
                {/*<div className={"pb-6 pt-40 flex flex-col items-center px-8 gap-8   "}>*/}
                {children}


            </div>
        </div>
    )
}
import React from "react";
import Image from "next/image";


export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"w-screen bg-main  h-screen flex justify-center items-center overflow-x-hidden"}>
            <div
                className=" min-h-fit  h-full lg:h-[1024px] max-h-[700px] relative  w-full 2xl:max-w-screen-2xl border-0  p-4  3xl:border-[3px] 3xl:border-dotted grid grid-cols-1 md:grid-cols-2  ">
                <div className={"relative min-full hidden md:block"}>
                    <Image
                        className={" rounded-2xl object-cover"}
                        src={"/Images/Login.png"}
                        objectFit="cover"
                        priority
                        alt={"Login Image"}
                        layout="fill"/>
                    <div
                        className={"absolute text-6xl  text text-center w-full  h-full  flex justify-center items-center  "}>
                        <h1 className={"w-1/2 font-bold text-text"}>Thrilled You&#39;ve Returned!</h1>
                    </div>

                </div>
                {children}


            </div>
        </div>
    )
}
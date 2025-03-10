"use client"

import React from "react";
import {CreateVideoContextProvider} from "@/app/context/CreateVideoContext";


export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <CreateVideoContextProvider>
            <div className={"flex flex-col w-full h-full pt-12  px-8 cursor-default items-center"}>
                <div className={"w-full min-h-screen    z-0  overflow-x-hidden relative mx-auto"}>
                    {children}
                </div>
            </div>
        </CreateVideoContextProvider>
)
}
import React from "react";

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"flex flex-col w-full h-full pt-12  px-8 cursor-default "}>
            <header className={"flex flex-col my-2 ml-[15%]"}>
                <h1 className={"text-4xl font-bold"}>Playlist</h1>
                <div className={"flex flex-col h-fit *:bg-text-primary opacity-20 w-1/4 ml-4 "} aria-hidden={true}>
                    <span className={"w-2  h-6"}/>
                    <span className={"w-full  h-2  "}/>
                    <span className={"h-12 w-2  ml-auto"}/>
                </div>
            </header>
            {children}
        </div>
    )
}
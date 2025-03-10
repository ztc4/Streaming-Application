import React from "react";

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"flex flex-col w-full h-full pt-12  px-8 cursor-default "}>
            <header className={"flex flex-col my-2  border-b-2"}>
                <h1 className={"text-4xl font-bold"}>Liked Videos</h1>
            </header>
            {children}
        </div>
    )
}
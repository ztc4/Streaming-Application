import Link from "next/link";

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const isLoggedIn: boolean =  false;
    return(
        <div className="w-screen flex bg-main md:text-xl text-text overflow-x-hidden max-w-full flex-col">
            <header className=" outline outline-1 min-w-[300px] mx-2 md:mx-8 z-50 rounded-lg bg-secondary max-w-[763px] md:w-[763px] max-h-[76px] min-h-[62px]  flex flex-row justify-between items-center fixed px-4 self-center mt-10   ">
                <div className="flex flex-row gap-2 md:gap-4 ">
                    {["Home", "About", "FAQ", "Explore"].map((current: string, index: number) => {
                        return (
                            <Link className=" " key={index} href={ current == "Home" ? "/":  `/${current.toLowerCase()}`}>{current}</Link>
                        )
                    })}

                </div>


                {
                    isLoggedIn ?
                        <Link className="border-l-2 border-2 border-opacity-80 border-red-400"  href={`/dashboard`}>Dashboard</Link>
                        : <Link className=""  href={`/login`}>Login</Link>
                }
            </header>
            {children}
        </div>
    )
}
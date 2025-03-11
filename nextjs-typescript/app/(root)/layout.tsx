import Link from "next/link";

export default function Layout({children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const isLoggedIn: boolean =  false;
    return(
        <div className="w-screen flex bg-main md:text-xl text-text overflow-x-hidden max-w-full flex-col">
            <header className="outline outline-1 min-w-[300px] mx-2 md:mx-8 z-50 rounded-lg bg-secondary max-w-[763px] md:w-[763px] max-h-[76px] min-h-[62px]  flex flex-row justify-between items-center fixed px-4 self-center mt-10   ">
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
            <footer className={"min-h-48 bg-footer z-40 gap-8 flex flex-col md:flex-row tracking-wide justify-between px-20 py-4 opacity-100"}>
                <div className={"w-full md:w-2/12 flex flex-col "}>
                    <h6 className={"text-2xl text-center h-1/4 font-semibold"}>Our Site</h6>
                    <p className={"text-md text-sm text-center"}> Welcome to the platform, this a personal project that between me and two other developers</p>
                </div>
                <div className={" w-full md:w-8/12 flex flex-row  text-sm gap-6"}>
                    <div className={"  flex flex-col col-span-6 items-center justify-center  "}>
                        <Link href={"/"} className={"text-2xl hover:text-blue-500 h-1/4 self-start font-semibold"} >Home</Link>
                        <ol className={"pl-2 list-disc  hover:[&_*]:text-blue-500 h-3/4  hover:[&_*]:duration-500 list-inside list-1  decoration-dotted"}>
                            <li>
                                <Link href={"/about"} passHref>
                                    About The Creators/Tech Stack
                                </Link>
                            </li>
                            <li>
                                <Link href={"/faq"} passHref>
                                    Frequently Asked Questions
                                </Link>
                            </li>
                            <li>
                                <Link href={"/login"} passHref>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href={"/signup"} passHref>
                                    Signup
                                </Link>
                            </li>
                        </ol>
                    </div>
                    <div className={" flex flex-col col-span-6 items-center justify-center "}>
                        <Link href={"/"} className={"text-2xl self-start hover:text-blue-500 h-1/4 font-semibold"}> Explore</Link>
                        <ol className={"pl-2 list-disc hover:[&_*]:text-blue-500 h-3/4   hover:[&_*]:duration-500 list-inside list-1 w-48 decoration-dotted"}>
                            <li>
                                <Link href={"/"} passHref>
                                    Educational
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"}  passHref>
                                    Gaming
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} passHref>
                                    Trending
                                </Link>
                            </li>
                        </ol>
                    </div>

                </div>


            </footer>
        </div>
    )
}
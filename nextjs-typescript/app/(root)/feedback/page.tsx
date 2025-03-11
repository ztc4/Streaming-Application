import clsx from "clsx";

export default function Feedback(){
    return(
        <div className={"w-screen min-h-screen   bg- z-0  overflow-x-hidden relative mx-auto"}>
            <div className="absolute inset-0  bg-cross-pattern z-10 bg-repeat opacity-30"/>
            <div className=" px-12 pb-28 pt-40 relative z-20 mx-auto  flex flex-col max-w-screen-md justify-center items-center ">
                <div className="relative inline-block   mx-auto">
                    <h1 className="relative z-10 text-6xl font-bold">Give Us Advice</h1>
                    <div className="absolute top-1/2 left-[15%] w-full h-full bg-gradient-orange transform -translate-y-1/2 skew-x-[-40deg] z-0"/>
                </div>
                <p className={"w-full text-text px-12  mt-4 text-center font-medium"}>There is an understanding there is the ability to improve this website, if you have any further information, help or questions then fill out the below!</p>
                <form className={"w-full grid gap-3  grid-cols-6"}>
                    <div className={clsx(` flex flex-col gap-2 col-span-6 `)}>
                        <label htmlFor={"email"}
                               className={"text-text h-4 mb-[8px] capitalize"}>Email:</label>
                        <input
                            // onChange={inputFunction}
                            name={"email"}
                            type={"Email"}
                            placeholder={"yourname@gmail.com"}
                            // value={value}
                            className={` w-full outline-1  border-none  autofill:pl-8  rounded-2xl focus:placeholder:px-8 duration-700 py-3 px-6 bg-input   focus:text-text text-text-secondary`}/>
                        {/*{error && <p className="mt-1 text-sm text-pink-600 ">*/}
                        {/*    {error}*/}
                        {/*</p>}*/}
                    </div>
                    <div className={clsx(` flex flex-col gap-2 col-span-6 `)}>
                        <label htmlFor={"advice"}
                               className={"text-text h-4 mb-[8px] capitalize"}>Your Advice/Problem :</label>
                        <textarea
                            // onChange={inputFunction}
                            name={"advice"}
                            rows={6}
                            placeholder={"Start typing .... "}
                            // value={value}
                            className={` w-full outline-1 z-20  border-none bg-opacity-40 autofill:pl-8  rounded-2xl focus:placeholder:px-8 duration-700 bg-input py-3 px-6   focus:text-text text-text-secondary`}/>
                        {/*{error && <p className="mt-1 text-sm text-pink-600 ">*/}
                        {/*    {error}*/}
                        {/*</p>}*/}
                    </div>
                    <div className={"col-span-6 flex justify-end  "}>
                        <button className={"  rounded-3xl w-1/2 px-4 py-1 text-lg bg-blue outline outline-[0.5px] font-semibold uppercase"}>Submit</button>
                    </div>

                </form>


            </div>

        </div>
    )
}
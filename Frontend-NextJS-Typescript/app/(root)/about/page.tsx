export default function Page(){
    return (
        <div className={"w-screen min-h-screen h-fit bg- z-0  overflow-hidden relative mx-auto"}>
            {/*background*/}
            <div className=" h-full absolute w-full bg-dotted-pattern z-0  opacity-30"></div>
            {/*Header*/}
            <div className="bg-gradient-blue-reverse mt-40 pl-12 py-4 z-20 w-1/2">
                <h1 className={"text-6xl font-bold opacity-100  z-20 "}>About</h1>
            </div>
            {/*Tech Stack*/}
            <main className=" md:px-12 pb-28 w-full max-w-screen-2xl mt-8  *:z-40 mx-auto  ">
                <section className={"w-full h-fit flex flex-row gap-2  justify-center relative"}>
                    <div
                        className={"aspect-w aspect-h-1 h-[281px] p-3 min-w-96 border-[1px]  bg-secondary "}>
                        <h5 className={"text-3xl font-semibold text-center"}>Frontend</h5>

                    </div>
                    <div
                        className={"aspect-w aspect-h-1 h-[281px] md:-translate-y-12 min-w-96 border-[1px]   bg-secondary "}>
                    </div>
                    <div
                        className={"aspect-w aspect-h-1 h-[281px] min-w-96 border-[1px]  bg-secondary "}>
                    </div>


                </section>
                <section className={"grid grid-cols-12 mt-12 gap-12"}>
                    <div
                        className={"col-span-12 md:col-span-7 min-h-[320px] aspect-w-2 aspect-h-1 rounded-2xl bg-secondary z-20 opacity-100"}>

                    </div>
                    <div className={"col-span-12 md:col-span-5 flex flex-col h-full justify-end pb-6 gap-6"}>
                        <h3 className={"font-bold text-4xl z-20"}>Zachary Coats</h3>
                        <p className={"font-medium z-20"}>My primary tasks included handling backend logic, designing in Figma, deploying and managing in Jira, and developing the frontend for login, signup, dashboard, and middleware.</p>
                        <button className={" z-20 w-fit rounded-2xl duration-500 bg-b-main text-b-secondary hover:bg-secondary hover:text-text border-white hover:border-[1px] py-2 px-4 font-medium"}> View LinkedIn</button>
                    </div>
                </section>
            </main>
            {/*    */}
        </div>
    )
}
import Sidebar from "@/app/components/ui/Sidebar";

export default function layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>){
    return(
        <div className={"flex overflow-x-hidden overflow-y-hidden flex-row bg-d-main"}>
            <Sidebar/>
            <main className={"w-full min-h-screen  bg-d-main pl-4 md:pl-[80px]"}>
                {children}
            </main>


        </div>


    )
}
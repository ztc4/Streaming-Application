
import VideosExpandableGrid from "@/app/components/videos&playlist/VideosExpandableGrid";
import axios from "axios";

import VideoRow from "@/app/components/videos&playlist/VideoRow";
import {cookies} from "next/headers";

interface PlaylistNumbers {
    LATER?: number;
    ACTIVITY?: number ;
}



export default  async function PastActivityAndWatchLaterPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    console.log("In your component this is your " ,token?.value)
    const playlistId: PlaylistNumbers = {}


    const getPlaylistId = async (category: "LATER" | "ACTIVITY") => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/me?category=${category}`,
                {
                    headers: {
                        Authorization: `Bearer ${token?.value}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response)

            playlistId[category] = response.data.content?.[0]?.id || undefined
        } catch (error) {
            console.error(`Failed to fetch playlist ID for ${category}:`, error);
        }
    };

    await getPlaylistId("ACTIVITY")
    await getPlaylistId("LATER")

    console.log("Here goes your playlistID : ", playlistId)


    if(playlistId.LATER == undefined && playlistId.ACTIVITY == undefined) return <div> Loading ... </div>



    return (
        <div className={"flex flex-col justify-end w-full h-full pt-12  gap-6  px-8 cursor-default "}>
            <header className={"flex flex-col  gap-4 items-center justify-center w-full my-2  "}>
                <h2 className={"text-4xl   font-medium"}>Past Activity</h2>
                <div
                    className="pastact flex flex-row overflow-x-auto gap-6 items-center py-4 justify-start  w-full min-h-48 h-fit pl-6 pr-6 flex-nowrap scroll-smooth">
                    {playlistId.ACTIVITY !== undefined &&
                        (<VideoRow
                        active={false}
                        expandable={false}
                        oneTime={true}
                        fetchURL={`/search/playlist/${playlistId.ACTIVITY}?`}
                    />)}
                </div>

            </header>
            <main className={"flex flex-col items-center gap-4 justify-center w-full  h-fit min-w-full"}>
                <h1 className={"text-4xl font-medium"}> Watch Later</h1>
                {playlistId.LATER !== undefined && (
                    <VideosExpandableGrid
                        oneTime={false}
                        fetchURL={`/search/playlist/${playlistId.LATER}?`}
                        expandable={true}
                        active={true}
                    />
                )}
            </main>



        </div>
    )
}
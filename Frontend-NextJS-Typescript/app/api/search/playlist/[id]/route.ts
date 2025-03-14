import {NextRequest} from "next/server";


// searchController/playlist/id Get Playlist by ID along with expanded option!
export async function GET(req: NextRequest,  { params }: { params: { id: number } }) {
    const { id } = await params;
}
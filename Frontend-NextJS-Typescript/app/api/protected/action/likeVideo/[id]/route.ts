import {NextRequest} from "next/server";

export async function POST(req: NextRequest,  { params }: { params: { id: number } }) {
    const { id } = await params;
}
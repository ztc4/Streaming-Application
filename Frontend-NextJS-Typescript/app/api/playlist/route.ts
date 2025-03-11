import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.cookies)
    const token = req.cookies.get("token")?.value; // Get token from cookies
    console.log("This is your token  : ", token);

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log("Hey is the token here now ? ", token)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Cookie: `token=${token};`
            },
            cache: "no-store",
        });
        console.log(res)

        if (!res.ok) throw new Error("Failed to fetch playlist IDs");

        const data = await res.json();

        return NextResponse.json({
            LATER: data?.content?.find((item: any) => item.category === "LATER")?.id,
            ACTIVITY: data?.content?.find((item: any) => item.category === "ACTIVITY")?.id,
        });
    } catch (error) {
        console.log("We made it here")
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

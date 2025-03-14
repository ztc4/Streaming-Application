import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
import { db } from '@/app/api/db/config';

export async function GET(req: NextRequest){




return new NextResponse("hello there")



}
import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const db = new PrismaClient();

export async function GET(req: NextRequest){




return new NextResponse("hello there")



}
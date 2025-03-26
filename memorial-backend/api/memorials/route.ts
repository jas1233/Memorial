import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Memorial from "@/models/memorial";

export async function GET() {
    await connectToDatabase();
    const memorials = await Memorial.find({});
    return NextResponse.json(memorials);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    const newMemorial = new Memorial(data);
    await newMemorial.save();
    return NextResponse.json({ message: "Memorial created successfully" });
}


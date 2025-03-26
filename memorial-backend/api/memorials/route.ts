import { connectToDB } from '@/lib/mongodb';
import Memorial from '@/models/memorial';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const newMemorial = new Memorial(body);
    await newMemorial.save();
    return NextResponse.json(newMemorial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create memorial', error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectToDB();
    const memorials = await Memorial.find().sort({ createdAt: -1 });
    return NextResponse.json(memorials);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch memorials', error },
      { status: 500 }
    );
  }
}

import connectMongoDB from "@/libs/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  console.log("POST METHOD");
  var { title, genre, watched } = await request.json();

  await connectMongoDB();
  await Movie.create({ title, genre, watched });
  return NextResponse.json(
    { message: "Movie created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  console.log("GET MOVIES METHOD");
  await connectMongoDB();
  const movies = await Movie.find();
  return NextResponse.json({ movies });
}

export async function DELETE(request) {
  console.log("DELETE METHOD");
  const id = request.nextUrl.searchParams.get("id"); //Id stored in URL as a Parameter
  await connectMongoDB();
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

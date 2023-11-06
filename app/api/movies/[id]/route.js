import connectMongoDB from "@/libs/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  console.log("PUT METHOD");
  const { id } = params;
  const {
    newTitle: title,
    newGenre: genre,
    newWatched: watched,
  } = await request.json();

  await connectMongoDB();
  await Movie.findByIdAndUpdate(id, { title, genre, watched });
  return NextResponse.json({ message: "Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  console.log("GET METHOD");
  const { id } = params;
  await connectMongoDB();
  const movie = await Movie.findById(id);
  return NextResponse.json({ movie }, { status: 200 });
}

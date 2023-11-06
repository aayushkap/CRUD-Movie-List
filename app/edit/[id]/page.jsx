"use client";

import EditMovieForm from "@/components/EditMovieForm";

async function getMovieById(id) {
  try {
    const res = await fetch(`/api/movies/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Edit({ params }) {
  const { id } = params;

  const data = await getMovieById(id);

  console.log(data);

  const { movie } = data;
  const { title, genre, watched } = movie;

  console.log(title, genre, watched);

  return (
    <>
      <div>
        <EditMovieForm id={id} title={title} genre={genre} watched={watched} />
      </div>
      ;
    </>
  );
}

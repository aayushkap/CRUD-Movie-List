"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function EditMovieForm({ id, title, genre, watched }) {
  const [titleNew, setTitleNew] = React.useState(title);
  const [genreNew, setGenreNew] = React.useState(genre);
  const [watchedNew, setWatchedNew] = React.useState(watched);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newTitle: titleNew,
          newGenre: genreNew,
          newWatched: watchedNew,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("This is a custom error message");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
      <input
        onChange={(e) => setTitleNew(e.target.value)}
        value={titleNew}
        className="text-white border-2 border-white py-4 px-8 max-sm:px-2 bg-indigo-600 bg-opacity-5 rounded-full focus:border-indigo-600 "
        type="text"
        placeholder="Movie Title"
      />
      <input
        onChange={(e) => setGenreNew(e.target.value)}
        value={genreNew}
        className="text-white border-2 border-white py-4 px-8 max-sm:px-2 bg-indigo-600 bg-opacity-5 rounded-full focus:border-indigo-600 "
        type="text"
        placeholder="Movie Genre"
      />
      <label className="text-white px-2 text-xl">
        <input
          type="checkbox"
          checked={watchedNew}
          onChange={() => setWatchedNew((prev) => !prev)}
          className="scale-150 mr-4 max-sm:mr-2"
        />
        Watched
      </label>

      <button className="text-white text-lg bg-violet-600 border-2 border-violet-600 rounded-md w-fit px-8 py-8 max-sm:px-4 mx-auto hover:bg-transparent transition-colors">
        Update
      </button>
    </form>
  );
}

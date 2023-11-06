"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [watched, setWatched] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !genre) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, watched }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("This is a custom error message");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="text-white border-2 border-white py-4 px-8 max-sm:px-2 bg-indigo-600 bg-opacity-5 rounded-full focus:border-indigo-600 "
        type="text"
        placeholder="Movie Title"
      />
      <input
        onChange={(e) => setGenre(e.target.value)}
        value={genre}
        className="text-white border-2 border-white py-4 px-8 max-sm:px-2 bg-indigo-600 bg-opacity-5 rounded-full focus:border-indigo-600 "
        type="text"
        placeholder="Movie Genre"
      />
      <label className="text-white px-2 text-xl">
        <input
          type="checkbox"
          checked={watched}
          onChange={() => setWatched((prev) => !prev)}
          className="scale-150 mr-4 max-sm:mr-2"
        />
        Watched
      </label>
      <button
        type="submit"
        className="text-white text-lg bg-violet-600 border-2 border-violet-600 rounded-md w-fit px-8 py-8 max-sm:px-4 mx-auto hover:bg-transparent transition-colors"
      >
        Add Movie
      </button>
    </form>
  );
}

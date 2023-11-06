"use client";

import RemoveBtn from "@/components/RemoveBtn";
import { get, set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import FilterBar from "./FilterBar";

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/movies", {
      cache: "no-store",
    }); // This will use the GET method by default.
    const json = await res.json();
    if (res.ok) {
      console.log("Movies fetched successfully");
    } else {
      throw new Error("This is a custom error message");
    }
    return json;
  } catch (error) {
    console.log("Unable to fetch movies: " + error);
  }
};

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { movies } = await getMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Error while fetching movies: " + error);
      }
    };

    fetchData();
  }, []);

  const uniqueGenres = new Set();

  for (const movie of movies) {
    uniqueGenres.add(movie.genre);
  }

  const genresArray = Array.from(uniqueGenres);

  const [filter, setFilter] = useState("All");
  let filteredMovies; // Declare filteredMovies variable

  if (filter !== "All") {
    filteredMovies = movies.filter((movie) => movie.genre === filter);
  } else {
    filteredMovies = movies;
  }

  // Sort the movies based on the "watched" property
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (a.watched && !b.watched) {
      return 1; // "a" comes first
    } else if (!a.watched && b.watched) {
      return -1; // "b" comes first
    } else {
      return 0; // Maintain the order (neither "a" nor "b" comes first)
    }
  });

  return (
    <>
      <FilterBar
        uniqueGenres={genresArray}
        setFilter={setFilter}
        moviesShown={sortedMovies.length}
      />

      {sortedMovies &&
        sortedMovies.map((movie) => (
          <div
            key={movie._id}
            className="border-2 rounded-lg px-8 max-sm:px-2 py-4 flex justify-between items-start my-5 test"
          >
            <div className="font-montserrat font-semibold ">
              <h2 className="w-fit text-3xl max-sm:text-xl text-white flex flex-row justify-between items-center gap-2">
                {movie.watched && (
                  <HiCheck className="w-8 h-8 border-2 border-green-500 rounded-full p-1" />
                )}{" "}
                {!movie.watched && (
                  <div className="w-8 h-8 border-2 border-yellow-500 rounded-full p-1" />
                )}{" "}
                {movie.title}
              </h2>
              <div className="text-sm text-indigo-600 leading-1 mt-2">
                <div>
                  Genre: <span className="text-white">{movie.genre}</span>
                </div>
                <div>
                  Date Added:{" "}
                  <span className="text-white">
                    {new Date(movie.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-14 flex justify-between">
              <RemoveBtn id={movie._id} />
              <Link href={`/edit/${movie._id}`}>
                <HiPencilAlt
                  size={24}
                  className="text-indigo-600 hover:text-indigo-900"
                />
              </Link>
            </div>
          </div>
        ))}
    </>
  );
}

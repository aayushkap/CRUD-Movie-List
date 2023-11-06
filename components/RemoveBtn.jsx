"use client";

import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }) {
  const removeMovie = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirm) {
      const res = await fetch(`/api/movies?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        location.reload();
      }
    }
  };

  return (
    <button
      onClick={removeMovie}
      className="text-red-400 hover:text-red-800 transition-colors"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}

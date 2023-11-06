import EditMovieForm from "@/components/EditMovieForm";

async function getMovieById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
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

  const { movie } = data;
  const { title, genre, watched } = movie;

  return (
    <div>
      <EditMovieForm id={id} title={title} genre={genre} watched={watched} />
    </div>
  );
}

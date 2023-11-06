export default function FilterBar({ uniqueGenres, setFilter, moviesShown }) {
  const handleChange = (event) => {
    const selectedGenre = event.target.value;

    setFilter(selectedGenre);
  };

  return (
    <section className="flex justify-between items-center my-3 px-8 max-sm:px-2">
      <div className="text-white font-montserrat py-1 text-xl max-sm:text-lg">
        Movies: {moviesShown}
      </div>
      <div>
        <select onChange={handleChange} className="rounded-lg p-1">
          <option>All</option>
          {uniqueGenres.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

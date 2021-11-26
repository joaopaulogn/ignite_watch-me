import { useEffect, useState } from "react";
import { api } from "../services/api";

import { GenreResponse } from "../types/genre";
import { Movie } from "../types/movie";

import { Content } from "./Content";
import { SideBar } from "./SideBar";

export function Wrapper() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>(
    {} as GenreResponse
  );

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponse>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar genreId={selectedGenreId} onClick={handleClickButton} />
      <Content title={selectedGenre.title} movies={movies} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { GenreResponse } from "../types/genre";

import { Button } from "./Button";

import "../styles/sidebar.scss";

interface SideBarProps {
  genreId: number;
  onClick: (id: number) => void;
}

export function SideBar({ genreId, onClick }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponse[]>([]);

  useEffect(() => {
    api.get<GenreResponse[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClick(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

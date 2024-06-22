"use client"
import { useState } from "react";
import Manga from "./manga";

interface MangaProps {
  id: number;
  name: string;
  cover_image: string;
  volumes_number: number;
  volumes_unity: string;
  tags: string;
  websites: string;
  rate: number;
  is_favorite: "true" | "false";
};

interface Props{
  initialMangas: any
}

export default function MangasGrid({initialMangas}:Props){

  const [mangas, setMangas] = useState(initialMangas);

  setMangas((mangas) => [...mangas, ...initialMangas]);

  return(
    <>
      
      <div className="manga-grid">
          {initialMangas.map((manga:any) => (
            <Manga
              key={manga.id}
              id={manga.id}
              coverImage={manga.coverImage.extraLarge}
              name={manga.title.romaji}
              volumesNumber={manga.episodes}
              volumesUnity="ep"
              tags={manga.genres}
              websites={manga.externalLinks}
              rate={(manga.averageScore/20)}
              isFavorite="false"
            />
          ))}

        </div> 
    </>
  )
}
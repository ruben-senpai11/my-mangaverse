"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Manga from "./manga";


interface Props {
  initialMangas: any,
  reload: number
}

export default function MangasGrid({ initialMangas, reload }: Props) {
  const [mangas, setMangas] = useState(initialMangas);
  const prevReloadRef = useRef(reload);

  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


  useEffect(() => {
    const top: any = document.getElementById("navbar");
    const bottom: any = document.getElementById("scroll");

    const navbarRect = top.getBoundingClientRect();
    const scrollRect = bottom.getBoundingClientRect();
    // Calculate horizontal distance
    const horizontalDistance = Math.abs(scrollRect.top - navbarRect.top);

    const toLoad = reload > prevReloadRef.current;
    prevReloadRef.current = reload;

    if (toLoad) {
      setMangas((mangas: any) => [...mangas, ...initialMangas]);
      //window.scrollTo({ top: horizontalDistance });
    }

  }, [initialMangas, reload]);


  return (
    <>
      <div className="manga-grid">
        {mangas.map((manga: any, index: number) => (
          manga.episodes>12  && manga.popularity>30000 && manga.isAdult==false &&
          <Manga
            key={manga.id}
            id={manga.id + manga.title.romaji}
            coverImage={manga.coverImage.extraLarge}
            name={manga.title.english ? manga.title.english : manga.title.romaji}
            volumesNumber={manga.episodes}
            volumesUnity="ep"
            tags={manga.genres}
            websites={manga.externalLinks}
            rate={(manga.averageScore / 20)}
            isFavorite="false"
          />
        ))}
      </div>
      <button onClick={() => (window.scrollTo({ top: 0, behavior:"smooth" }))} type="button" className="scrollToTop" >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
        </svg>
      </button>
    </>
  )
}
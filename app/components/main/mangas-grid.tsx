import Manga from "./manga";
import arrowDown from "../../../public/assets/icons/arrow-down.svg"
import Filters from "./filters";

interface Props {
  title: string | string[] | any;
  searchParams: { [key: string]: string | string[] | undefined }
}

interface Manga{
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

async function MangasGrid({ title, searchParams }: Props) {

  const response = await fetch('http://localhost:9000/mangas', { cache: 'reload' });
  const mangas: Manga[] = await response.json()


  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const genre: any = searchParams.genre || ""
  const tag = capitalizeFirstLetter(genre);

  const filter1 = searchParams.filter1;
  const filter2 = searchParams.filter2;

  const filterAndSortMangas = (mangas: Manga[]) => {

    const mangaArray = Object.values(mangas);

    let filteredMangas = mangaArray.filter((manga: Manga) =>
      tag.length === 0 || manga.tags.includes(tag)
    );


    const orderByNewest = filter1 === "mostPopular" ? true : false;
    const orderByOldst = filter1 === "lessPopular" ? true : false;

    orderByNewest ? filteredMangas.sort((a: any, b: any) => b.rate - a.rate) : null
    orderByOldst ? filteredMangas.sort((a: any, b: any) => a.rate - b.rate) : null



    if (filter2 === 'asc') {
      filteredMangas.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (filter2 === "desc") {
      filteredMangas.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }


    return filteredMangas;
  };

  const filteredMangas: Manga[]  = filterAndSortMangas(mangas);
  console.log(filteredMangas)
  return (
    <>
      <div className="aside-holder"></div>
      <div className="main">
        <div className="title-and-filters">
          <h1 className="title">
            {title.length > 0 ? title : "All Verses"}
          </h1>
          <Filters />
        </div>
        {Object.keys(filteredMangas).map((manga, index) => (
          <span>{filteredMangas[manga].id} </span>
        ))}
        <div className="manga-grid">
          {Object.keys(filteredMangas).map((manga, index) => (
            <Manga
              key={filteredMangas[manga].id}
              id={filteredMangas[manga].id}
              coverImage={filteredMangas[manga].cover_image}
              name={filteredMangas[manga].name}
              volumesNumber={filteredMangas[manga].volumes_number}
              volumesUnity={filteredMangas[manga].volumes_unity}
              tags={filteredMangas[manga].tags}
              websites={filteredMangas[manga].websites}
              rate={filteredMangas[manga].rate}
              isFavorite={filteredMangas[manga].is_favorite}
            />
          ))}

          {/* <MangasSorting mangas={mangas} /> */}
        </div>
      </div>
    </>
  );
}

export default MangasGrid;

import Manga from "./manga";
import arrowDown from "../../../public/assets/icons/arrow-down.svg"
import Filters from "./filters";
import "./main.css"

interface MangaProps{
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

interface Props {
  title: string | string[] | any;
  searchParams: { [key: string]: string | string[] | undefined }
  mangas : any,
}

async function Main({ title, searchParams, mangas }: Props) {


  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const genre: any = searchParams.genre || ""
  const tag = capitalizeFirstLetter(genre);

  const filter1 = searchParams.filter1;
  const filter2 = searchParams.filter2;

  const filterAndSortMangas = (mangas: MangaProps[]) => {

    const mangaArray = Object.values(mangas);

    let filteredMangas = mangaArray.filter((manga: MangaProps) =>
      tag.length === 0 || manga.tags.includes(tag)
    );


    if (filter2 === 'asc') {
      filteredMangas.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (filter2 === "desc") {
      filteredMangas.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }
    const orderByNewest = filter1 === "mostPopular" ? true : false;
    const orderByOldst = filter1 === "lessPopular" ? true : false;

    orderByNewest ? filteredMangas.sort((a: any, b: any) => b.rate - a.rate) : null
    orderByOldst ? filteredMangas.sort((a: any, b: any) => a.rate - b.rate) : null




    return filteredMangas;
  };

  const filteredMangas: MangaProps[]  = filterAndSortMangas(mangas);
  // console.log(filteredMangas)


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
        {/* {Object.keys(filteredMangas).map((manga, index) => (
          <span>{filteredMangas[manga].id} </span>
        ))} */}
        <div className="manga-grid">
          {Object.keys(filteredMangas).map((manga, index) => (
            <Manga
              key={filteredMangas[index].id}
              id={filteredMangas[index].id}
              coverImage={filteredMangas[index].cover_image}
              name={filteredMangas[index].name}
              volumesNumber={filteredMangas[index].volumes_number}
              volumesUnity={filteredMangas[index].volumes_unity}
              tags={filteredMangas[index].tags}
              websites={filteredMangas[index].websites}
              rate={filteredMangas[index].rate}
              isFavorite={filteredMangas[index].is_favorite}
            />
          ))}

          {/* <MangasSorting mangas={mangas} /> */}
        </div>
      </div>
    </>
  );
}

export default Main;

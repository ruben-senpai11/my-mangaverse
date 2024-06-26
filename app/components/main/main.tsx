import Manga from "./manga";
import Filters from "./filters";
import "./main.css"
import { InfiniteScroll } from "../InfiniteScroll";
import MangasGrid from "./mangasGrid";

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

interface Props {
  title: string | string[] | any;
  searchParams: { [key: string]: string | string[] | undefined }
  mangas: any,
  reload: number
}

async function Main({ title, searchParams, mangas, reload }: Props) {


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



  return (
    <>
      <div className="aside-holder"></div>
      <div className="main flex ">
        <div className="description ">
          <p>
            Find here ALL (or almost) anime & mangas right here.
            You can reach any of them in one single search !
          </p>
          {/* <p>Futhermore, you can in one search find out a manga even when you don't know the exact name, enjoy!</p> */}
        </div>
        <div className="title-and-filters">
          <div className="genres-menu flex align-center">
            <div className="genres-burger flex flex-column none">
              <span className="burger"></span>
              <span className="burger"></span>
              <span className="burger"></span>
            </div>
            <h1 className="title">
              {title.length > 0 ? title : "All Verses"}
            </h1>
          </div>
          <Filters />
        </div>
        <MangasGrid initialMangas={mangas} reload={reload} />
        {/* <p>Loaded : {mangas.data.Page.media.length} </p> */}
        <InfiniteScroll/>
      </div>
    </>
  );
}

export default Main;

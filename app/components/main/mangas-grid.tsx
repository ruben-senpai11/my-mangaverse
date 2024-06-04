import Manga from "./manga";
import arrowDown from "../../../public/assets/icons/arrow-down.svg"
import Filters from "./filters";

interface Props {
  title: string | string[] | any;
  searchParams: { [key: string]: string | string[] | undefined }
}


async function MangasGrid({ title, searchParams }: Props) {

  const response = await fetch('http://localhost:9000/mangas', { cache: 'reload' });
  const mangas = await response.json()


  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const genre: any = searchParams.genre || ""
  const tag = capitalizeFirstLetter(genre);

  const filter1 = searchParams.filter1;
  const filter2 = searchParams.filter2;

  let tagSet, filter1Set, filter2Set = "false"
  const filterAndSortMangas = (mangas: any) => {


    const mangaArray = Object.values(mangas);

    let filteredMangasId = []

    let filteredMangas = mangaArray.filter((manga: any) =>
      tag.length === 0 || manga.tags.includes(tag)
    );




    const orderByNewest = filter1 === "mostPopular" ? true : false;
    const orderByOldst = filter1 === "lessPopular" ? true : false;

    orderByNewest ? filteredMangas.sort((a: any, b: any) => b.rate - a.rate) : null
    orderByOldst ? filteredMangas.sort((a: any, b: any) => a.rate - b.rate) : null



    if (filter2 === 'asc') {
      filteredMangas.sort((a: any, b: any) => a.name.localeCompare(b.name));
      console.log("filter2A");
    } else if (filter2 === "desc") {
      filteredMangas.sort((a: any, b: any) => b.name.localeCompare(a.name));
      console.log("filter2B");
    }

    // Collect the IDs of the filtered mangas
    filteredMangasId = filteredMangas.map((manga: any) => manga.id);
    console.log(mangaArray.length);
    console.log(filteredMangasId);

    return filteredMangasId;
  };

  const filteredMangasId = filterAndSortMangas(mangas);
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
        {filteredMangasId.length}
        <div className="manga-grid">
          {filteredMangasId.map((mangaId) => (
            mangas[mangaId] ? (
              <Manga
                key={mangas[mangaId].id}
                id={mangas[mangaId].id}
                coverImage={mangas[mangaId].cover_image}
                name={mangas[mangaId].name}
                volumesNumber={mangas[mangaId].volumes_number}
                volumesUnity={mangas[mangaId].volumes_unity}
                tags={mangas[mangaId].tags}
                websites={mangas[mangaId].websites}
                rate={mangas[mangaId].rate}
                isFavorite={mangas[mangaId].is_favorite}
              />
            ) : null
          ))}

          {/* <MangasSorting mangas={mangas} /> */}
        </div>
      </div>
    </>
  );
}

export default MangasGrid;

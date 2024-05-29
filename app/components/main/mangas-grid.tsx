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

  const genre: any = searchParams.genre || "All"
  const tag = capitalizeFirstLetter(genre);

  const filter1 = searchParams.filter1;
  const filter2 = searchParams.filter2;


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
        <div className="manga-grid">
          {Object.keys(mangas).map((manga, index) => (
            tag && tag.length > 0 && mangas[manga].tags.includes(tag) ?

              <Manga
                key={index}
                id={mangas[manga].id}
                coverImage={mangas[manga].cover_image}
                name={mangas[manga].name}
                volumesNumber={mangas[manga].volumes_number}
                volumesUnity={mangas[manga].volumes_unity}
                tags={mangas[manga].tags}
                websites={mangas[manga].websites}
                rate={mangas[manga].rate}
                isFavorite={mangas[manga].is_favorite}
              />
              :
              ""
          ))}
          {Object.keys(mangas).map((manga, index) => (
            tag === "All" ?

              <Manga
                key={index}
                id={mangas[manga].id}
                coverImage={mangas[manga].cover_image}
                name={mangas[manga].name}
                volumesNumber={mangas[manga].volumes_number}
                volumesUnity={mangas[manga].volumes_unity}
                tags={mangas[manga].tags}
                websites={mangas[manga].websites}
                rate={mangas[manga].rate}
                isFavorite={mangas[manga].is_favorite}
              />
              :
              ""
          ))}
        </div>
      </div>
    </>
  );
}

export default MangasGrid;

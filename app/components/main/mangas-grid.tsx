import Manga from "./manga";
import arrowDown from "../../../public/assets/icons/arrow-down.svg"
import Filters from "./filters";

interface Props {
  title: string | string[] | any;
}

async function MangasGrid({ title }: Props) {

  const response = await fetch('http://localhost:9000/mangas', { cache: 'no-store' });
  const mangas = await response.json()

  return (
    <>
      <div className="main">
        <div className="title-and-filters">
          <h1 className="title">
            {title.length > 0 ? title : "All Verses"}
          </h1>
          <Filters/>
        </div>
        <div className="manga-grid">
          {Object.keys(mangas).map((manga) => (
            <Manga
              key={mangas[manga].id}
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
          ))}
        </div>
      </div>
    </>
  );
}

export default MangasGrid;

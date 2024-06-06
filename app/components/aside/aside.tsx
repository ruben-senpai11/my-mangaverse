import Genre from "./genre";
import "./aside.css"

interface Props {
	title: string,
  genres: {[key: string]: {name: string, label: string, thumbnail: string}},
  searchParams: {[key: string]: string | string[] | undefined}
}

async function Aside({ title, genres, searchParams}: Props ) {

  const selectedGenre = searchParams.genre;

	return (
		<>
			<div className="aside">
				<h2>{title}</h2>
        <div className="genres">
          {Object.keys(genres).map((genre, index) => (
            <>
            <Genre 
              key={index}
              isActive={genres[genre].name === selectedGenre ? 'active': ''}
              genre={genres[genre].name}
              label={genres[genre].label}
              thumbnailSrc={genres[genre].thumbnail}
              />            
            </>
              ))}            
        </div>
			</div>
		</>
	);
}

export default Aside;

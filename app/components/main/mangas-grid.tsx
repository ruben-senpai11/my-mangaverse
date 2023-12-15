import Manga from "./manga";

interface Props {
	title: string | string[];
}

async function MangasGrid({ title }: Props) {

	const response = await fetch('http://localhost:9000/mangas', {cache: 'no-store'});
	const mangas = await response.json()

	return (
		<>
			<div className="main">
				<h1 className="displayed-genre">
					{title.length > 0 ? title : "All Verses"}
				</h1>
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

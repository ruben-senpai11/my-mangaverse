import Link from "next/link";
import Thumbnail from "./thumbnail";


interface Props {
  isActive: string,
	genre: string,
	label: string,
	thumbnailSrc: string,
}

function Genre({ isActive, genre, label, thumbnailSrc}: Props) {

	return (
		<>
		 <Link
				href={`?${new URLSearchParams({ genre: genre })}`}
				className={"genre " + isActive}
				key={genre}
			>
			<Thumbnail thumbnailSrc={thumbnailSrc}></Thumbnail>
			<h3 className="label">{label}</h3>
		</Link>
		</>
	);
}

export default Genre;

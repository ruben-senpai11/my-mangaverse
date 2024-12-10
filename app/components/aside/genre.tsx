"use client"

import Link from "next/link";
import Thumbnail from "./thumbnail";
import { useSearchParams } from "next/navigation";


interface Props {
  isActive: string,
	genre: string,
	label: string,
	thumbnailSrc: string,
}

function Genre({ isActive, genre, label, thumbnailSrc}: Props) {

  const searchParams = useSearchParams()
  const filterKey = "genre";

	return (
		<>
		 <Link
        href={`?${(() => {
          const params = new URLSearchParams(searchParams.toString());
          const filterValue = genre; 
          params.set(filterKey, filterValue);
          return params.toString();
        })()}`}
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

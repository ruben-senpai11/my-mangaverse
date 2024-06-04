import Link from "next/link"
import Dropdown from "./dropdown"


function Filters() {

  const filter1 = [
    { key: "mostPopular", value: "Les plus populaires" },
    { key: "lessPopular", value: "Les moins populaires" },
    { key: "newest", value: "Les plus récents" },
    { key: "oldest", value: "Les plus anciens" }
  ]
  const filter2 = [
    { key: "asc", value: "A - Z" },
    { key: "desc", value: "Z - A" },
    { key: "onGoing", value: "En cours" },
    { key: "paused", value: "En pause" },
    { key: "finished", value: "Terminé" }
  ]

  return (
    <>
      <div className="filters">
        <Link href="/">
          <button type="button" className="reset-filters flex justify-center">            
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </button>
        </Link>
        <Dropdown filterName="filter1" filters={filter1} />
        <Dropdown filterName="filter2" filters={filter2} />
      </div>
    </>
  )
}

export default Filters
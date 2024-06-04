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
        <Dropdown filterName="filter1" filters={filter1} />
        <Dropdown filterName="filter2" filters={filter2} />
      </div>
    </>
  )
}

export default Filters
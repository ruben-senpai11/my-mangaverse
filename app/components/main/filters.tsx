import Dropdown from "./dropdown"


function Filters() {

  const filter1:string[] = ["Les plus populaires", "Les moins populaires", "Les plus récents", "Les plus anciens"]
  const filter2 = ["A - Z", "Z - A", "En cours", "En pause", "Terminé"]

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
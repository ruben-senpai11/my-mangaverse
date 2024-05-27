import Dropdown from "./dropdown"


function Filters() {

  const filter1:string[] = ["Les plus populaires", "Les moins populaires", "Les plus récents", "Les plus anciens"]
  const filter2 = ["A - Z", "Z - A", "En cours", "En pause", "Terminé"]

  return (
    <>
      <div className="filters">
        <Dropdown filters={filter1} />
        <Dropdown filters={filter2} />
      </div>
    </>
  )
}

export default Filters
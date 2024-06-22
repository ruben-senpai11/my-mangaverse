"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface Filter {
  key: string,
  value: string
}
interface Props {
  filterName: string,
  filters: Filter[]
}


export default function Dropdown({ filterName, filters }: Props) {

  const [isDropped, setIsDropped] = useState(false)

  const handleDropdown = () => {
    setIsDropped(!isDropped)
  }

  const dropDownRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsDropped(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  const handleFilter = () => {
    setIsDropped(false)
  }

  const searchParams = useSearchParams()
  const filterKey = filterName;

  const currentFilterKey = searchParams.get(filterName) || "All";
  const currentFilter : any = filters.find(filter => filter.key === currentFilterKey)?.value;

  return (
    <>
      <div ref={dropDownRef} >
        <button type="button" onClick={handleDropdown} className="filter flex justify-center">
          <span >
            {currentFilter ? currentFilter : filters[0].value}
          </span>
          <svg fill="currentColor" version="1.1" width="10px" height="10px" viewBox="0 0 30.727 30.727">
            <g>
              <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0
		                l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/>
            </g>
          </svg>
        </button>
        <button type="button" className={(isDropped ? "flex" : "none") + " filter dropdown"}>
          {filters.map((filter, index) => (
            currentFilterKey !== (filter.key || "All" ) ?
              <Link
                href={`?${(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  const filterValue = filter.key;
                  params.set(filterKey, filter.key);
                  return params.toString();
                })()}`}
                key={index}
                onClick={handleFilter}
              >
                {filter.value}
              </Link> 
            : ""
          ))}

        </button>
      </div>
    </>
  )
}
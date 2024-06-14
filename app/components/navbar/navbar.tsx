'use client'
import { useEffect, useState } from 'react';
import ThemeMode from './themeMode';
import { ChangeEvent } from 'react';
import Link from 'next/link';
import "./navigation.css"

interface Props {
  title: string
}

function Navbar({ title }: Props) {
  const [searchInput, setsearchInput] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setsearchInput(event.target.value)
  }
  const searchIcon = (<svg width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>);



  //Mobile Nav
  const [mobileNav, setmobileNav] = useState(false);

  const toogleMenu = () => {
    if (mobileNav == false) {
      setmobileNav(true)
    } else {
      setmobileNav(false)
    }
  }
  

  
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link href="//">
            {/* <img src={logo} alt="logo" /> */}
            <h1>{title}</h1>
          </Link>
        </div>
        <div className={(mobileNav == true ? 'mobile-menu' : 'desktop-menu') + " "}>
          <div className="navlinks">
            <div className="search-box">
              <input type="text" className="search-input" id="floatingInput" value={searchInput} onChange={handleInput} />
              <label htmlFor="floatingInput" className={searchInput.length > 0 ? 'displayed-none' : 'displayed-flex'}>
                {searchIcon}
                <span>Find the manga you deserve</span>
              </label>
            </div>
          </div>
          <div className=" flex justify-center align-center ">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg> */}
          <ThemeMode />
          </div>
        </div>
        <div className={(mobileNav === true ? "opened " : "") + "menu-icons relative"} onClick={toogleMenu}>
          <div className="burger"></div>
          <div className="burger"></div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
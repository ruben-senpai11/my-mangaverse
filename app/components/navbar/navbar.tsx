'use client'
import { useState } from 'react';
// import logo from '../../assets/konoha-logo.jpg'
import ThemeMode from './themeMode';
import { ChangeEvent } from 'react';

interface Props{
  title : string
}

function Navbar ({title}:Props){
  const [searchInput, setsearchInput] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) =>{
    setsearchInput(event.target.value)
  }
  const searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>);
  
  return (
    <>
      <nav className="navbar">  
        <div className="logo">
          {/* <img src={logo} alt="logo" /> */}
          <h1>{title}</h1>
        </div>
        <div className="search-box">
          <input type="text" className="search-input" id="floatingInput" value={searchInput} onChange={handleInput}/>
          <label htmlFor="floatingInput" className={searchInput.length > 0 ? 'displayed-none' : 'displayed-flex'}>
            {searchIcon}
            <span>Find the manga you deserve</span>
          </label>
        </div>
        <ThemeMode></ThemeMode>
      </nav>
    </>
  )
}

export default Navbar;
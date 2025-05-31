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
      <div id="navbar" className="navbar">
        <div className="logo">
          <Link href="/">
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
                <span className="help-text">Find the manga you deserve</span>
              </label>
            </div>
          </div>
          <div className=" flex justify-center align-center gap-6">
            <button type='button' className="btn notifications ">
              <svg xmlns="http://www.w3.org/2000/svg" className='svg-primary' width="25px" height="25px" viewBox="0 0 24 24" id="_24x24_On_Light_Notification-Alert" data-name="24x24/On Light/Notification-Alert">
                <rect id="view-box" width="24" height="24" fill="none" />
                <path id="Shape" d="M6,17v-.5H2.25A2.253,2.253,0,0,1,0,14.25v-.382a2.542,2.542,0,0,1,1.415-2.289A1.247,1.247,0,0,0,2.1,10.572l.446-4.91A6.227,6.227,0,0,1,10.618.286a5.477,5.477,0,0,0-.635,1.374A4.794,4.794,0,0,0,8.75,1.5,4.7,4.7,0,0,0,4.045,5.8L3.6,10.708A2.739,2.739,0,0,1,2.089,12.92a1.055,1.055,0,0,0-.589.949v.382A.751.751,0,0,0,2.25,15h13A.751.751,0,0,0,16,14.25v-.382a1.053,1.053,0,0,0-.586-.948A2.739,2.739,0,0,1,13.9,10.708l-.2-2.18a5.473,5.473,0,0,0,1.526.221l.166,1.822a1.26,1.26,0,0,0,.686,1.005,2.547,2.547,0,0,1,1.418,2.29v.382a2.252,2.252,0,0,1-2.25,2.25H11.5V17A2.75,2.75,0,0,1,6,17Zm1.5,0A1.25,1.25,0,0,0,10,17v-.5H7.5ZM15.047,6.744A3.486,3.486,0,0,1,13.5,6.28L13.456,5.8a4.7,4.7,0,0,0-1.648-3.185,3.5,3.5,0,0,1,.61-1.417A6.221,6.221,0,0,1,14.95,5.662l.1,1.081v0Z" transform="translate(3.25 2.25)" fill="currentcolo" className='svg-foreground' />
                <path id="Shape-2" data-name="Shape" d="M3.5,7A3.5,3.5,0,1,1,7,3.5,3.5,3.5,0,0,1,3.5,7Z" transform="translate(15 2)" className='svg-secondary' />
              </svg>  
            </button>
            {/* <button type="button" className='btn'>
              <svg xmlns="http://www.w3.org/2000/svg" className="account-icon primary" xmlnsXlink="http://www.w3.org/1999/xlink" fill="currentcolor" stroke='none' width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlSpace="preserve">
                <g transform="matrix(1,0,0,1,0,-96)">
                  <g transform="matrix(0.923077,0,0,1,-2.92308,-1)">
                    <circle cx="20.5" cy="105.5" r="6.5" />
                  </g> 
                  <g transform="matrix(0.952381,0,0,1.0101,0.285714,-1.27273)">
                    <ellipse cx="16.5" cy="120.5" rx="10.5" ry="5.5" />
                  </g>
                  <path d="M16,113.889C12.437,113.889 9.285,114.883 7.327,116.367C5.83,117.501 5,118.932 5,120.444C5,121.957 5.83,123.388 7.327,124.522C9.285,126.006 12.437,127 16,127C19.563,127 22.715,126.006 24.673,124.522C26.17,123.388 27,121.957 27,120.444C27,118.932 26.17,117.501 24.673,116.367C22.715,114.883 19.563,113.889 16,113.889ZM16,115.889C19.06,115.889 21.783,116.687 23.466,117.961C24.396,118.667 25,119.504 25,120.444C25,121.385 24.396,122.222 23.466,122.928C21.783,124.202 19.06,125 16,125C12.94,125 10.217,124.202 8.534,122.928C7.604,122.222 7,121.385 7,120.444C7,119.504 7.604,118.667 8.534,117.961C10.217,116.687 12.94,115.889 16,115.889ZM16,97C12.159,97 9,100.339 9,104.5C9,108.661 12.159,112 16,112C19.841,112 23,108.661 23,104.5C23,100.339 19.841,97 16,97ZM16,99C18.783,99 21,101.486 21,104.5C21,107.514 18.783,110 16,110C13.217,110 11,107.514 11,104.5C11,101.486 13.217,99 16,99Z" style={{fill:"rgb(25,144,167);"}} />
                </g>
              </svg>
            </button>
            <svg className='svg-primary' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
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
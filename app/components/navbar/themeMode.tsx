import { useEffect, useRef, useState } from 'react';
import "./themeMode.css"

function ThemeMode() {

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = () => {
    if (themeMode === 'light') {
      setThemeMode('dark')
    } else {
      setThemeMode('light')
    }

    console.log(themeMode)
  }

  const handleTheme = (theme:string) => {
    setThemeMode(theme);
  }

  useEffect(() => {
    localStorage.setItem("theme", themeMode ? themeMode : "light");
    const userTheme: any = localStorage.getItem("theme");
    document.querySelector('html')?.setAttribute('data-theme', userTheme)
  }, [themeMode])




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


  return (
    <>
      <div ref={dropDownRef} className="theme relative">
        {/* <label className="theme-switch">
          <input type="checkbox" value={themeMode ? themeMode : "light"} onChange={handleToggle} defaultChecked={themeMode === "light" ? true : false} />
          <span className="theme-slider round"></span>
        </label> */}
        {/* <span className="current-theme">{themeMode} Mode</span> */}
        <button type="button" onClick={handleDropdown} className=" multiple-theme">
          <div className="theme-colors flex justify-center">
            <div className="primary-color theme-color"></div>
            <div className="secondary-color theme-color"></div>
            <div className="tertiary-color theme-color"></div>
          </div>
          <span className="flex align-center gap-6" >
            Theme
            <svg fill="currentColor" version="1.1" width="10px" height="10px" viewBox="0 0 30.727 30.727">
              <g>
                <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0
		                l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/>
              </g>
            </svg>
          </span>
        </button>
        <div className={(isDropped ? "flex" : "none") + " theme-dropdown"}>
          <button type="button" onClick={() => {setThemeMode("light"); handleDropdown}} className=" multiple-theme light-colors">
            <div className="theme-colors flex justify-center">
              <div className="light-primary-color theme-color"></div>
              <div className="light-secondary-color theme-color"></div>
              <div className="light-tertiary-color theme-color"></div>
            </div>
            <span className="flex align-center gap-6" >
              Light
            </span>
          </button>
          <button type="button" onClick={() => {setThemeMode("dark"); handleDropdown}} className=" multiple-theme dark-colors">
            <div className="theme-colors flex justify-center">
              <div className="dark-primary-color theme-color"></div>
              <div className="dark-secondary-color theme-color"></div>
              <div className="dark-tertiary-color theme-color"></div>
            </div>
            <span className="flex align-center gap-6" >
              Dark
            </span>
          </button>
          <button type="button" onClick={() => {setThemeMode("zen"); handleDropdown}} className=" multiple-theme zen-colors">
            <div className="theme-colors flex justify-center">
              <div className="zen-primary-color theme-color"></div>
              <div className="zen-secondary-color theme-color"></div>
              <div className="zen-tertiary-color theme-color"></div>
            </div>
            <span className="flex align-center gap-6" >
              Zen 
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ThemeMode;
import { useEffect, useState } from 'react';
function ThemeMode(){

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = ()=>{  
    if(themeMode==='light'){
      setThemeMode('dark')
    }else{
      setThemeMode('light')
    }

    console.log(themeMode) 
  }
  useEffect(()=>{
    localStorage.setItem("theme", themeMode? themeMode : "light");
    const userTheme:any = localStorage.getItem("theme");
    document.querySelector('html')?.setAttribute('data-theme', userTheme)
  }, [themeMode])

  return(
    <>
      <div className="theme">
        <label className="theme-switch">
          <input type="checkbox" value={themeMode? themeMode : "light"} onChange={handleToggle} defaultChecked={themeMode === "light" ? true : false}/>
          <span className="theme-slider round"></span>
        </label>
        <span className="current-theme">{themeMode} Mode</span>
      </div>
    </>
  )
}

export default ThemeMode;
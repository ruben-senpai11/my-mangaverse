import './App.css'
import Aside from './components/aside/aside';
import Navbar from './components/navbar/navbar';
import MangasGrid from './components/main/mangas-grid';

import allGenres from './assets/thumbnails/Forbidden-four.jpg'
import MangaSorting from './components/main/mangaSorting';

// let genreDatas = {
//     action: { label: "Action", thumbnailSrc: berserkSrc.src },
//     shonen: { label: "Shonen", thumbnailSrc: narutoSrc.src },
//     comedy : { label: "Comedy", thumbnailSrc: grandBlueSrc.src },
//     drama : { label: "Drama", thumbnailSrc: zetsuenSrc.src },
//     adventure : { label: "Adventure", thumbnailSrc: onePieceSrc.src },
//     thriller : { label: "Thriller", thumbnailSrc: kingdomSrc.src },
//     intellect : { label: "Intellect", thumbnailSrc: psychoPassSrc.src }
//   }


async function App({searchParams} : {searchParams: {[key: string]: string | string[] | undefined }}){

  const response = await fetch('http://localhost:9000/genres', { cache: ('no-store') });
  const genres = await response.json()
  
  const mainTitle = searchParams.genre;
  
  const genreExists = () =>{
    let value = false;
    {Object.keys(genres).map((genre) =>{
      if (mainTitle == genres[genre].name){
        value = true;
      } 
    })}
    return value;
  }

  const checkUrlGenreParam =  genreExists()
  
  return (
    <>
      <Navbar title="MANGAS"/>
      <div className="body"> 
        <Aside title="Genres" genres={genres} searchParams={searchParams} />
        <MangasGrid title={checkUrlGenreParam ? mainTitle : ''} searchParams={searchParams} />
        {/* <MangaSorting searchParams={searchParams}/> */}
      </div>
    </>
  )

}

export default App;
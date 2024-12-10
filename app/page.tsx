import './App.css'
import Aside from './components/aside/aside';
import Navbar from './components/navigation/navbar';
import Main from './components/main/main';

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

import { getMangas } from './actions/getMangas';
import { cookies } from 'next/headers'


async function App({ searchParams }: { searchParams: { [key: string]: string | string[] | any } }) {


  const cookieStore = cookies()
  let page: any = searchParams.load || 1
  let type: any = searchParams.type || "anime"

  let perPage = 50;
  let mangas = await getMangas(type, page, perPage)


  /*
    Datas from local Express.js api

    const response = await fetch('http://localhost:9000/genres', { cache: ('no-store') });
    const genres = await response.json()
    
    */

  const filePath = path.join(process.cwd(), 'public', 'genres.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: response } = Papa.parse(fileContent, { header: true });
  const genres:any = response

  const mainTitle = searchParams.genre;

  const genreExists = () => {
    let value = false;
    {
     // Object.keys(genres ?? {}).map((genre, index) => {
        genres.forEach((genre:string, index:number) => {
        if (genres) {
          if (mainTitle == genres[index].name) {
            value = true;
          }
        }
      })
    }
    return value;
  }

  const checkUrlGenreParam = genreExists()

  return (
    <>
      <Navbar title="MANGAS" />
      <div className="container">
        <Aside title="Genres" searchParams={searchParams} genres={genres} />
        <Main title={checkUrlGenreParam ? mainTitle : ''} searchParams={searchParams} mangas={mangas} reload={page} />
      </div>
      {/* <Footer/> */}
    </>
  )

}

export default App;
import './App.css'
import Aside from './components/aside/aside';
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';

import { createClient } from '@supabase/supabase-js'
import { getMangas } from './actions/getMangas';

const supabaseUrl = 'https://xdliufymtwhainhnlzas.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined in environment variables');
}
const supabase = createClient(supabaseUrl, supabaseKey)



async function App({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  let mPerPage = 5;
  let page =  parseInt(searchParams.load);
  
  let mangas = await getMangas(page, mPerPage)
  
  



  /*
    Datas from local Express.js api

    const response = await fetch('http://localhost:9000/genres', { cache: ('no-store') });
    const genres = await response.json()
    
    */

  const fetchGenres = async () => {
    const { data, error } = await supabase
      .from('genres')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    return data
  };

  fetchGenres();

  const fetchMangas = async () => {
    const { data, error } = await supabase
      .from('mangas')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    return data
  };

  fetchMangas();
  const genres = await fetchGenres();
  // const mangas = await fetchMangas();
  const mainTitle = searchParams.genre;

  const genreExists = () => {
    let value = false;
    {
      Object.keys(genres ?? {}).map((genre, index) => {
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
        <Main title={checkUrlGenreParam ? mainTitle : ''} searchParams={searchParams} mangas={mangas} />
      </div>
    </>
  )

}

export default App;
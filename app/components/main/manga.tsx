'use client';
import { useState } from 'react';
import narutoCover from '../../assets/cover/naruto-tag.jpg'
import Favorite from './favorite';
import Rate from './rate';
import Image from 'next/image';


interface Props{
  id: number,
  coverImage: string,
  name: string,
  volumesNumber: number,
  volumesUnity: string,
  tags: [],
  websites: [],
  rate: number,
  isFavorite: "true" | "false"
}

function Manga ({id, coverImage, name, volumesNumber, volumesUnity, tags, websites, rate, isFavorite}: Props){

  const [favorite, setFavorite] = useState(isFavorite)
  const handleFavorite = ()=>{
    if(favorite === "true" ) return setFavorite("false")
    return setFavorite("true")
  }

  return(
    <>
      <div className="manga">
        <div className="cover-image">
          {/* <Image src={"/assets/cover/"+coverImage} width={300} height={100} alt={coverImage} /> */}
          <Image src={coverImage} width={300} height={100} alt={coverImage} />
        </div>
        <div className="details">
          <div className="name-and-volume">
            <h4 className="name">{name}</h4>
            <span className="volumes">
              <span className="number">{volumesNumber}</span>
              <span className="unity">{volumesUnity}</span>
            </span>
          </div>
          <div className="tags">
            {tags.map((tag:string, index) => (
              tag.length !== 0 ? index<4 && <span key={index} >{tag}</span> : ""      
            ))}
          </div>
          <div className="infos">
            <div className="available-on">
              <h3>Available on:</h3>
              {websites.map((website:any, index) => (
                index<2 && <span key={index}><a href={(website.url)} target="_blank" className="manga-links">{website.site}</a></span>
              ))}
              <span className="more"><button type='button'>see more...</button></span>
            </div>
            <div className="rate-and-favorite">
              <div className="rate">
                <h4>Rate:</h4>
                <Rate note={rate} />
              </div>
              <div className="favorite">
                <Favorite isFilled={favorite} setFavorite={handleFavorite} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manga;
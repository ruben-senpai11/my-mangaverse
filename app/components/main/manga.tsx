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
  tags: string,
  websites: string,
  rate: number,
  isFavorite: "true" | "false"
}

function Manga ({id, coverImage, name, volumesNumber, volumesUnity, tags, websites, rate, isFavorite}: Props){

  const [favorite, setFavorite] = useState(isFavorite)
  const handleFavorite = ()=>{
    if(favorite === "true" ) return setFavorite("false")
    return setFavorite("true")
  }

  const tags_list = tags.split(' ');
  const websites_list = websites.split(' ');

  return(
    <>
      <div className="manga">
        <div className="cover-image">
          <Image src={"/assets/cover/"+coverImage} width={500} height={100} alt={coverImage} />
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
            {tags_list.map((tag, index) => (
              tag.length !== 0 ? <span key={index} >{tag}</span> : ""      
            ))}
          </div>
          <div className="infos">
            <div className="available-on">
              <h3>Available on:</h3>
              {websites_list.map((website, index) => (
                <span key={index}><a href={(website)} target="_blank" className="manga-links">{new URL(website).hostname}</a></span>
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
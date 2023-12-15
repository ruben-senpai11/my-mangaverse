interface Props{
  thumbnailSrc: string
}

function Thumbnail({thumbnailSrc}:Props){
  return(
    <img className="thumbnail" src={thumbnailSrc} alt="" />
  )
}

export default Thumbnail;
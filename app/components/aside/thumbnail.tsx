import Image from "next/image";

interface Props{
  thumbnailSrc: string
}

function Thumbnail({thumbnailSrc}:Props){
  return(
    <Image className="thumbnail" width={100} height={100} src={"./assets/thumbnails"+thumbnailSrc} alt="" />
  )
}

export default Thumbnail;
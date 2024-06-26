"use client"
import React from 'react';
import { useEffect, useState, useRef, useCallback } from "react";

import loadImage from "../../public/assets/icons/loading.gif"

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import Image from 'next/image';

export function InfiniteScroll() {

  function resetPath(){
    router.push(pathname + '?' + createQueryString('load', "1"), {scroll:false})
  }

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const [load, setLoad] = useState("0");

  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            const value = Cookies.get("loadMore") || "1";
            const currentLoad = Number(value)+1
            const reload:string = currentLoad.toString()
            
            router.push(pathname + '?' + createQueryString('load', reload))
            setLoad(reload)
            console.log("newLoad:"+ reload);
            Cookies.set('loadMore', reload)

            return reload;
        }else{
          setTimeout(resetPath, 2000)
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={targetRef} 
        id="scroll" 
        className="i-scroll flex align-center"
      >
      <Image src={loadImage} width={40} height={40} alt="loading"  className="loadGif"
        onLoad={()=>(
          Cookies.set('loadMore', "1"), 
          router.push(pathname + '?' + createQueryString('load', "1"))
        )}/>
      {/* <p>loading </p> */}
      </div>
    </>
  )
}

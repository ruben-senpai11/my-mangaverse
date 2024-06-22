"use client"
import { useEffect, useState, useRef, useCallback } from "react";

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";

export function InfiniteScroll() {

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

 
  const currentLoad = searchParams.has("load") ? searchParams.get('load') : "0"

  const [load, setLoad] = useState("0");
  const targetRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(prevLoad => {
            const param = parseInt(prevLoad) + 1;
            const newLoad = param.toString()
            router.push(pathname + '?' + createQueryString('load', newLoad))

            console.log("newLoad:"+ newLoad);

            return newLoad;
          });
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
      <div ref={targetRef} className="i-scroll">
      <p>Loading 50 more .... </p>
      </div>
    </>
  )
}

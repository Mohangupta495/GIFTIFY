import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useGiftContext } from "../context/gif-context";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

const Category = () => {
  const [results,setResults]:Array<any>=useState([]);
  const {gf,filter}=useGiftContext();
  const {category}=useParams();
  const fetchResults=async()=>{
    const {data}=await gf.gifs(category as string,category as string);
    setResults(data);
  }
  useEffect(()=>{
    fetchResults();
  },[category,filter])
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4 text-white">
      <div className="w-full sm:w-72">
        {results.length>0 && <Gif gif={results[0]} hover={false}/>}
        <span className="text-gray-400 text-sm pt-2">
          Don't tell it to me, GIF it to me!
        </span>
        <FollowOn/>
        <div className="divider"></div>
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category?.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 font-bold pb-3 hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
        {results.length>0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {results.map((gif:any,index:number)=>(
              <Gif gif={gif} key={index}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Category

import { useParams } from "react-router-dom"
import { useGiftContext } from "../context/gif-context";
import { useEffect, useState } from "react";
import FIlterGif from "../components/FIlterGif";
import Gif from "../components/Gif";

const Search = () => {
  const {qurey}=useParams();
  const {gf,filter}=useGiftContext();
  const [searchResults,setSearchResults]:Array<any>=useState([]);
  const fetchSearchResults=async()=>{
    const {data}=await gf.search(qurey as string,{
      sort:"relevant",
      lang:"en",
      type:filter as any,
      limit:20,
    });
    setSearchResults(data);
  }
  useEffect(()=>{
    fetchSearchResults();
  },[filter,qurey]);
  return (
    <div className="my-4 text-white">
      <h2 className="text-5xl pb-3 font-extrabold">{qurey}</h2>
      <FIlterGif alignLeft={true}/>
      {searchResults.length>0?(<div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {searchResults.map((result:any,index:number)=>(
          <Gif gif={result} key={index}/>
        ))}
      </div>):(<span className="text-white">
        No Gifs fround for {qurey}. Try seaching for Sticker instead.
      </span>)}
    </div>
  )
}

export default Search

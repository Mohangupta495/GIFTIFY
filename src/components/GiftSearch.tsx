import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"

const GiftSearch = () => {
    const [qurey,setQurey]=useState("");
    const navigate=useNavigate();
    const searchGIFs=()=>{
        if(qurey.trim()===""){
            return;
        }
        navigate(`search/${qurey}`);
    }
  return (
    <div className="flex relative">
      <input type="text" value={qurey} onChange={(e:any)=>setQurey(e.target.value)} placeholder="Search all the GIFs and Stickers" className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-white outline-none"/>
      {qurey && <button onClick={()=>setQurey("")} className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6">
        <HiMiniXMark size={22}/>
        </button>}
      <button onClick={searchGIFs} className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded">
        <HiOutlineMagnifyingGlass size={30} className="-scale-x-100"/>
      </button>
    </div>
  )
}

export default GiftSearch

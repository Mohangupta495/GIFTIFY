import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2';
import { useGiftContext } from '../context/gif-context';
import GiftSearch from './GiftSearch';

const Header = () => {

  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const {gf,favorites}=useGiftContext();

  const fetchGifCategories=async()=>{
    const {data}=await gf.categories();
    console.log(data);
    setCategory(data as any);
  }

  useEffect(()=>{
   fetchGifCategories(); 
  },[])
  return (
    <nav>      
      <div className='flex justify-between items-center mb-2 relative gap-4 text-white'>
        <Link to={"/"} className='flex gap-2 cursor-pointer'>
          <img src={logo} className='h-10 w-10' />
          <h1 className='text-neutral-100 font-semibold text-2xl cursor-pointer tracking-tighter'>
            GIFTIFY
          </h1>
        </Link>
        <div className='font-bold text-md flex gap-2 items-center'>
          {category.slice(0,5)?.map((cat:any,index:number)=>(
            <Link key={index} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block text-white' to={`${cat.name_encoded}`}>
            {cat.name}
          </Link>          
          ))}
          <button onClick={() => setShowCategory(!showCategory)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient border-b-4 hidden lg:block text-white ${showCategory ? 'gradient' : ""}`}
            />
          </button>          
          {favorites.length>0 && <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
            <Link to="/faverotes">Favorite Gifs</Link>
          </div>}
          <button>
            <HiMiniBars3BottomRight size={30} className='text-sky-400 block lg:hidden' />
          </button>
        </div>
        {showCategory && (<div className='absolute right-0 top-14  px-10 pt-6 pb-9 w-full gradient z-20'>
          <span className='text-3xl font-extrabold'>Categories</span>
          <hr className='bg-gray-100 opacity-50 my-5'/>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {category?.map((cat:any,index:number)=>(
              <Link className='font-bold' to={`${cat.name_encoded}`} onClick={()=>{setShowCategory(false)}} key={index}>{cat.name}</Link>
            ))}
            
          </div>
        </div>)}        
      </div>
      {/* search bar */}
      <GiftSearch/>
    </nav>
  )
}

export default Header

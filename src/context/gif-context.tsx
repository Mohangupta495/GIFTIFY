import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface GiftContextType {
  gf: GiphyFetch;
  gifs: Array<any>;
  setGifs: React.Dispatch<React.SetStateAction<any | undefined>>;   
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  favorites: any;
  setFavorites: React.Dispatch<React.SetStateAction<any>>;
  addToFavorites:Function;
}

const GiftContext = createContext<GiftContextType>({} as GiftContextType);

const GiftProvider = ({ children }: { children: ReactNode }) => {
  const [gifs, setGifs] = useState<Array<any>>([]);
  // added new function
  const [filter, setFilter] = useState<string>("gifs");
  const [favorites, setFavorites] = useState<any>([]);
  const addToFavorites=(id:string)=>{
    if(favorites.includes(id)){
       const updatedFavorites=favorites.filter((itemId:string)=>itemId!==id);
       setFavorites(updatedFavorites);
       localStorage.setItem("favoriteGIFs",JSON.stringify(updatedFavorites)); 
    }
    else{
        const updatedFavorites=[...favorites];
        updatedFavorites.push(id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteGIFs",JSON.stringify(updatedFavorites)); 
    }
  }  
  useEffect(()=>{    
        const updatedFavorites=JSON.parse(localStorage.getItem("favoriteGIFs") as any); 
        console.log(updatedFavorites)
        setFavorites(updatedFavorites?updatedFavorites:[]);
  },[])
  const gf = new GiphyFetch(import.meta.env.VITE_API_KEY as string);

  const contextValue: GiftContextType = {
    gf,
    gifs,
    setGifs,
    filter,
    setFilter,
    favorites,
    setFavorites,
    addToFavorites
  };

  return (
    <GiftContext.Provider value={contextValue}>
      {children}
    </GiftContext.Provider>
  );
};

export const useGiftContext = () => {
  return useContext(GiftContext);
};

export default GiftProvider;

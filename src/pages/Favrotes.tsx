import {useEffect, useState} from "react";
import { useGiftContext } from "../context/gif-context";
import Gif from "../components/Gif";

const Favorites = () => {
  const {gf, favorites} = useGiftContext();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    console.log(favorites);
    const {data: gifs} = await gf.gifs(favorites);
    setFavoriteGIFs(gifs as any);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif:any,index:number) => (
          <Gif gif={gif} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
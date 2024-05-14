import { useEffect } from "react";
import { useGiftContext } from "../context/gif-context";
import Gif from "../components/Gif";
import FIlterGif from "../components/FIlterGif";

const Home = () => {  
  const { gf, gifs, setGifs, filter } = useGiftContext();

  const fetchTrendingGif = async () => {
    const { data } = await gf.trending(
      {
        limit: 20,
        type: filter as any,
        rating: "g",
      }
    );
    console.log(data);
    setGifs(data);
  }

  useEffect(() => {
    fetchTrendingGif();
  }, [filter])
  return (
    <div >
      <img src="https://media.giphy.com/headers/2022-04-27-32-1651084365/AAPIHM_BANNER_HP.gif" className="w-full mt-4 rounded" />
      <FIlterGif showTrending={true}/>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif: any, index: number) => (
          <Gif gif={gif} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home

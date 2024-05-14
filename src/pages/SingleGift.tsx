import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineExternalLink, HiChevronDown, HiChevronUp, HiHeart } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import { useGiftContext } from "../context/gif-context";
import FollowOn from "../components/FollowOn";
import Gif from "../components/Gif";

interface GifData {
  user?: {
    avatar_url: string;
    display_name: string;
    username: string;
    description?: string;
  };
  title: string;
  source?: string;
  id: string;
}

const contentType = ["gifs", "stickers", "texts"] as const;

const SingleGift = () => {
  const { type, slug } = useParams<{ type: string; slug: any }>();
  const [gif, setGif] = useState<GifData | null>(null);
  const [relatedGifs, setRelatedGifs] = useState<GifData[]>([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, favorites ,addToFavorites} = useGiftContext();
  const [loading,setLoading]=useState(true);
// const {addToFavorites}=useGiftContext();
  useEffect(() => {
    if (!contentType.includes(type as any)) {
      // throw new Error("Invalid Content Type");
    }

    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setGif(data as any);
      setRelatedGifs(related as any);
      setLoading(false);
    };

    fetchGif();
  }, [gf, type, slug]);

  const shareGif = () => {
    // Implement share functionality
  };

  const embedGif = () => {
    // Implement embed functionality
  };
  if(loading){
    return <p>Loaidng//...</p>
  }
  return (
    <div className="grid grid-cols-4 my-10 gap-4 text-white">
      <div className="">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img src={gif.user.avatar_url} alt={gif.user.display_name} className="h-14" />
              <div className="px-2">
                <div className="font-bold">{gif.user.display_name}</div>
                <div className="text-gray-400">@{gif.user.username}</div>
              </div>
            </div>
            {gif.user.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore ? gif.user.description : `${gif.user.description.slice(0, 100)}...`}
                <span
                  className="flex items-center cursor-pointer font-bold text-white"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiChevronDown size={20} />
                    </>
                  )}
                </span>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />

        {gif?.source && (
          <div>
            <span className="text-gray-400">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" rel="noopener noreferrer" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="text-gray-400 truncate mb-2">{gif?.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className="h-14" />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-400">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() =>{addToFavorites(gif?.id); console.log("Add to favorites")}} // Placeholder
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiHeart
                size={30}
                className={`${favorites.includes(gif?.id || "") ? "text-red-500" : ""}`}
              />
              Favorite
            </button>
            <button onClick={shareGif} className="flex gap-6 items-center font-bold text-lg">
              <FaPaperPlane size={25} />
              Share
            </button>
            <button onClick={embedGif} className="flex gap-5 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {relatedGifs.slice(1).map((relatedGif) => (
              <Gif gif={relatedGif} key={relatedGif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGift;

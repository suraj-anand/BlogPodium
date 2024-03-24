import { useEffect, useState } from "react"
import { Button, Img } from "components"
import BlogCard from "components/shared/BlogCard"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"
import { CgSmileSad } from "react-icons/cg";
import axios from "axios"
import { useParams } from "react-router-dom"
import PodcastCard from "components/shared/PodcastCard"

const UserPodcasts = ({name}) => {

    const { userid } = useParams();

    const [ podcasts, setPodcasts ] = useState([]); 
    const [ loadMore, setLoadMore ] = useState("");
    const [ loading, setLoading ] = useState(false);

    async function fetchPodcasts(url=`/api/podcast/?user_id=${userid}`){
        setLoading(true);
        try {
          const response = await axios.get(url);
          if (response.data?.results){
            setPodcasts(podcasts => ([...podcasts, ...response.data?.results]))
          }
          setLoadMore(response.data?.next);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
    }
    
    function handleLoadMore(){
        const url = loadMore.replace("http:", location.protocol);
        fetchPodcasts(url);
    }

    useEffect(() => {
        fetchPodcasts();
    }, [])



    return (
        <div className="container">
            <div className="flex align-bottom gap-3">
                <Button color="gray_300" size="7xl" className="w-[76px]">
                    <Img src="/assets/img_podcast_1.svg" />
                </Button>
                <div className="flex flex-col gap-1 my-auto">
                    <h4 className="text-3xl font-bold text-gray-600_01">{name} Podcasts</h4>
                </div>
            </div>

            <div className="row p-3">
                { 
                loading ? <Spinner /> :
                <>
                {
                    podcasts.map( podcast => {
                        const { id, cover_image, title, podcast_owner } = podcast;
                        return (
                            <PodcastCard 
                                id={id}
                                imgSrc={cover_image}
                                author={podcast_owner}
                                title={title}
                            />
                        )
                    })
                }
                {
                    podcasts.length === 0 && 
                    <p className="text-xl flex items-center gap-2 justify-start px-3">
                        <CgSmileSad size={24} className="text-yellow-700" />
                        {name} has got no podcasts.</p>
                }

                
                <div className='text-center my-3'>
                    { loadMore && <button className='btn btn-outline-info rounded-lg' onClick={handleLoadMore}>Load more</button> }
                </div>
                </>
            }
            </div>
        </div>
    )
}

export default UserPodcasts
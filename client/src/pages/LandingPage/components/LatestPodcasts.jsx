import axios from "axios"
import { Button, Img } from "components"
import PodcastCard from "components/shared/PodcastCard"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { RxCaretDown } from "react-icons/rx"

const LatestPodcasts = () => {

    const [ loading, setLoading ] = useState(false);
    const [ podcasts, setPodcasts ] = useState([]); 
    const [ loadMore, setLoadMore ] = useState(""); 


    async function fetchPodcasts(url="/api/podcast/"){
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

    useEffect(() => {
        fetchPodcasts()
    }, [])

    function handleLoadMore(){
        const url = loadMore.replace("http:", location.protocol);
        fetchPodcasts(url);
    }


    return (
        <div className="container my-2 my-lg-1">
            {/* Heading  */}
            <div className="flex align-bottom gap-3">
                <Button color="gray_300" size="7xl" className="w-[76px]">
                    <Img src="/assets/img_podcast_1.svg" />
                </Button>
                <div className="flex flex-col gap-1 my-auto">
                    <h4 className="text-3xl font-bold text-gray-600_01">Latest Podcasts</h4>
                    <p className="font-semibold text-blue_gray-600">Listen out  latest podcasts</p>
                </div>
            </div>

            {/* Podcast Cards */}
            <div className="row my-3">
                { loading && <Spinner className="block mx-auto my-3"/> }
                
                {
                    podcasts.map( (podcast, index) => {
                        const { id, cover_image, podcast: _podcast, title, podcast_owner } = podcast;
                        return (
                            <PodcastCard 
                                id={id}
                                imgSrc={cover_image}
                                title={title}
                                author={podcast_owner}
                                index={index}
                                all={podcasts.flatMap(e => e.id)}
                                />
                        )
                    })
                }
            </div>

            <div className="flex">
                { loadMore && <button className='flex items-center btn btn-outline-info rounded-lg mx-auto' onClick={handleLoadMore}> Load more <RxCaretDown size={24} /> </button> }
            </div>
        </div>
    )
}

export default LatestPodcasts
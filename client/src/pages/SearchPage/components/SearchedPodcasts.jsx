import axios from "axios";
import BlogCard from "components/shared/BlogCard";
import PodcastCard from "components/shared/PodcastCard";
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

const SearchedPodcasts = ({  query } ) => {

    const [ podcasts, setPodcasts ] = useState([]); 
    const [ loadMore, setLoadMore ] = useState("");
    const [ loading, setLoading ] = useState(false);
  
    async function fetchPodcasts(url=""){
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
      setPodcasts([])
      fetchPodcasts(`/api/podcast/?query=${query}`);
    }, [query])

    if (loading) {
        return (<Spinner className="d-block mx-auto text-gray-600_01" />)
    }

    if (podcasts?.length === 0){
        return (
            <p className="text-center text-2xl text-gray-500">Oops! No results found</p>
        )
    }

    return (
        <div className="container">
            
            <div className="row my-3">
                {
                    podcasts.map(podcast => {
                        const { id, creation_time, cover_image, title, user_id, podcast_owner } = podcast;
                        return (
                            <PodcastCard
                                id={id}
                                title={title}
                                author={podcast_owner}
                                imgSrc={cover_image}
                            />
                        )
                    })
                }
            </div>


        {
            (loadMore) && (
                <div className="flex items-center justify-center my-5">
                    <button className="w-72 btn btn-outline-dark p-3 text-lg rounded-full" onClick={() => {handleLoadMore()}}>Load More</button>
                </div>
            )
        }
        </div>
    )
}

export default SearchedPodcasts
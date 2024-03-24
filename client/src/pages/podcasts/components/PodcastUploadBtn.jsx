import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import Back from "components/mini/Back";
import useAxios from 'hooks/useAxios'
import { PodcastContext } from "../context/PodcastContext";

const PodcastUploadBtn = ({ podcast, coverImage }) => {

  const { title } = useContext(PodcastContext)

  const {
    call,
    loading,
    data,
    status_code,
    error
  } = useAxios({
    url: "/api/podcast/",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  
  function handlePodcastPublish(event){
    event.target.classList.add("disabled")
    const type = podcast.type.split("/").at(0)
    call({
      "title": title,
      "type": type,
      "cover_image": coverImage,
      "podcast": podcast,
    })
  }
  
  return (
    <>
    <div className="flex flex-col items-center my-3">
      
      {
        status_code === 201 &&
        <>
          <div className="my-3 text-gray-600_01 text-xl font-bold">Podcast Published</div>
          <Back />
        </>
      }

      {
        loading && 
        <div className="my-3 text-gray-600_01"><Spinner /></div>
      }

      {
        (title.length > 1 && podcast && status_code !== 201) &&
        <button className="btn btn-outline-dark flex gap-2 p-2 items-center justify-center" onClick={handlePodcastPublish}>
          <span>Publish</span>
          <span><IoSend /> </span>
        </button>
      }

    </div>
    </>
  )
}

export default PodcastUploadBtn;
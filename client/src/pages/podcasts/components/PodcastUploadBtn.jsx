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

  
  function handleBlogPublish(event){
    event.target.classList.add("disabled")
    call({
      content, 
      podcast,
      coverImage,
      title
    })
  }
  
  return (
    <>
    <div className="flex flex-col items-center my-3">
      
      {
        status_code === 201 &&
        <>
          <div className="my-3 text-gray-600_01 text-xl font-bold">Blog Published</div>
          <Back />
        </>
      }

      {
        loading && 
        <div className="my-3 text-gray-600_01"><Spinner /></div>
      }

      {
        (title.length > 1 && podcast && status_code !== 201) &&
        <button className="btn btn-outline-dark flex gap-2 p-2 items-center justify-center" onClick={handleBlogPublish}>
          <span>Publish</span>
          <span><IoSend /> </span>
        </button>
      }

    </div>
    </>
  )
}

export default PodcastUploadBtn;
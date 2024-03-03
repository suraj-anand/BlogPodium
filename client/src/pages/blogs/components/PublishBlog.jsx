import { useContext } from "react";
import { IoSend } from "react-icons/io5";
import { BlogContext } from "../context/BlogContext";
import useAxios from 'hooks/useAxios'
import { Spinner } from "react-bootstrap";
import Back from "components/mini/Back";

const PublishBlog = ({ file }) => {
  
  const { content, title } = useContext(BlogContext);
  const {
    call,
    loading,
    data,
    status_code,
    error
  } = useAxios({
    url: "/api/blog/",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  

  function handleBlogPublish(event){
    event.target.classList.add("disabled")
    call({
      content, 
      file,
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
        status_code !== 201 &&
        <button className="btn btn-outline-dark flex gap-2 p-2 items-center justify-center" onClick={handleBlogPublish}>
          <span>Publish</span>
          <span><IoSend /> </span>
        </button>
      }

    </div>
    </>
  )
}

export default PublishBlog
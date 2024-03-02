import { useContext } from "react";
import { IoSend } from "react-icons/io5";
import { BlogContext } from "../context/BlogContext";

const PublishBlog = ({}) => {
  
  const { file, content, title } = useContext(BlogContext)

  function handleBlogPublish(){
    console.log(file);
    console.log(content);
    console.log(title);
  }
  
  return (
    <div className="flex flex-col items-center my-3">
      <button className="btn btn-outline-dark flex gap-2 p-2 items-center justify-center" onClick={handleBlogPublish}>
        <span>Publish</span>
        <span><IoSend /> </span>
      </button>
    </div>
  )
}

export default PublishBlog
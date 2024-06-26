import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import Navbar from "components/shared/Navbar"
import Overlay from "components/generic/Overlay";
import { LuSend } from "react-icons/lu";
import { useAxios } from "hooks";
import 'react-quill/dist/quill.snow.css';
import { Spinner } from "react-bootstrap";
import axios from "axios";


const EditBlog = () => {

  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate(); 
  const { blogid: id } = useParams();

  const [ fetching, setFetching ] = useState(true);
  const [ content, setContent ] = useState("");
  const [ title, setTitle ] = useState("");
  
  const [ blogData, setBlogData ] = useState({});

  const {
    call,
    loading,
    data,
    status_code,
    error
  } = useAxios({
    url: `/api/blog/${id}/`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  async function fetchBlogDetails(){
    setFetching(true);
    try {
      const response = await axios.get(`/api/blog/${id}/`);
      const { title: _title, content: _content, user_id: _user_id } = response.data;
      setTitle(_title);
      setContent(_content);
      setBlogData(() => ({
        "owner_id": _user_id,
        "fetchStatus": true
      }))
    } catch (error) {
      setBlogData(() => ({
        "fetchStatus": false
      }))
      console.log(error)
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchBlogDetails()
  }, [])

  // If updated redirect.
  useEffect(() => {
    if ([200, 201].includes(status_code)){
      navigate(`/blog/${id}/`);
    }
  }, [status_code])

 
  // React Quill Setting
  const modules = {
      toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script:  "sub" }, { script:  "super" }],
          ["blockquote", "code-block"],
          [{ list:  "ordered" }, { list:  "bullet" }],
          ["link", "image"],
          ["clean"],
      ],
  };

  // Update Click Event Handler
  function handleUpdate(){
    const payload = {
      "title": title,
      "content": content
    }

    call(payload);
  }


  if (loading) {
    return (
      <Overlay>
          <div className="flex flex-col items-center">
          <p className="text-lg my-2">Hold on for a moment please, your blog is being updated.</p>
            <Spinner />
          </div>
      </Overlay>
    )
  }

  if (fetching) {
    return (
      <Overlay>
          <div className="flex flex-col items-center">
          <p className="text-lg my-2">Hold on for a moment please.</p>
            <Spinner />
          </div>
      </Overlay>
    )
  }

  if (error) {
    return (
      <Overlay>
        <div className="flex flex-col items-center">
          <p className="text-lg text-red-400 my-2">Error on Updating the blog.</p>
        </div>
    </Overlay>
    )
  }

  
  // If Invalid blogid supplied, display 404 
  if (!blogData?.fetchStatus){
    return <Overlay><p className="text-xl">404 | Not found</p></Overlay>
  }

  // client side validation to check user is authorized to edit the blog
  if ( blogData?.owner_id !== user_id ) {
    return (
      <Overlay>
        <div className="flex flex-col items-center">
          <p className="text-lg text-red-400 my-2">Unauthorized to edit this blog.</p>
        </div>
      </Overlay>
    )
  }


  // Edit Component
  return (
    <>
      <Navbar type="back" />

      <div className="p-3">
        <input 
          id="title" 
          className='form-control rounded-2xl' 
          placeholder="Title of your Blog" 
          type="text" 
          name="title" 
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          required />
      </div>

      <div className="container-fluid">
        <ReactQuill theme="snow" 
          value={content} 
          onChange={e => {setContent(e)}} 
          modules={modules}
          />
      </div>


    <div className="flex items-center justify-center my-3">
        <button className="flex items-center gap-1 btn btn-outline-dark" onClick={handleUpdate}>
          Update <LuSend />
        </button>
      </div>
    </>
  )
}

export default EditBlog;
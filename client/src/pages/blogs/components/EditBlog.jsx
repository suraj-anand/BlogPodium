import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import { isEmpty } from 'lodash'
import Navbar from "components/shared/Navbar"
import Overlay from "components/generic/Overlay";
import { LuSend } from "react-icons/lu";
import { useAxios } from "hooks";
import 'react-quill/dist/quill.snow.css';
import { Spinner } from "react-bootstrap";


const EditBlog = () => {

  const navigate = useNavigate(); 
  
  const { state } = useLocation();
  const { id, content: _content, title: _title } = state;

  const [ content, setContent ] = useState(_content);
  const [ title, setTitle ] = useState(_title);



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


  useEffect(() => {
    if ([200, 201].includes(status_code)){
      navigate(-1);
    }
  }, [status_code])

  if (isEmpty(state)){
    return <Overlay><p className="text-xl">404 | Not found</p></Overlay>
  }

  
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

  return (
    <>
      <Navbar />

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
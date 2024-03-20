import { ToastContainer } from 'react-toastify';
import Navbar from "components/shared/Navbar"
import { Quill } from "./components/Quill"
import { Offcanvas } from "components/shared/Offcanvas"
import FileUpload from "components/shared/FileUpload"
import PublishBlog from "./components/PublishBlog";
import { BlogContextProvider } from "./context/BlogContext";
import 'react-toastify/dist/ReactToastify.min.css';
import TitleInput from './components/TitleInput';
import { useState } from 'react';


const WriteBlog = () => {

  const [ file, setFile ] = useState(null);

  return (
    <>
    <BlogContextProvider>
    <Navbar type="back" showOptions={false} />
    <Offcanvas />
      <div className="container">
            <TitleInput />
            <FileUpload file={file} setFile={setFile} type='cover image'/>
            <Quill />
            <PublishBlog file={file} />
      </div>
      </BlogContextProvider>
      <ToastContainer />
    </>
  )
}

export default WriteBlog
import { ToastContainer } from 'react-toastify';
import Navbar from "components/shared/Navbar"
import { Quill } from "./components/Quill"
import { Offcanvas } from "components/shared/Offcanvas"
import CoverImageUpload from "pages/blogs/components/CoverImageUpload"
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
            <CoverImageUpload file={file} setFile={setFile} />
            <Quill />
            <PublishBlog file={file} />
      </div>
      </BlogContextProvider>
      <ToastContainer />
    </>
  )
}

export default WriteBlog
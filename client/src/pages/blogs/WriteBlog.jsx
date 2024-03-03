import { ToastContainer } from 'react-toastify';
import Navbar from "components/shared/Navbar"
import { Quill } from "./components/Quill"
import { Offcanvas } from "components/shared/Offcanvas"
import CoverImageUpload from "pages/blogs/components/CoverImageUpload"
import PostBlog from "./components/PublishBlog";
import { BlogContextProvider } from "./context/BlogContext";
import 'react-toastify/dist/ReactToastify.min.css';
import TitleInput from './components/TitleInput';


const WriteBlog = () => {

  return (
    <>
    <BlogContextProvider>
    <Navbar type="back" showOptions={false} />
    <Offcanvas />
      <div className="container">
            <TitleInput />
            <CoverImageUpload />
            <Quill />
            <PostBlog />
      </div>
      </BlogContextProvider>
      <ToastContainer />
    </>
  )
}

export default WriteBlog
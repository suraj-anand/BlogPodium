import { useState } from 'react';
import Navbar from "components/shared/Navbar"
import FileUpload from "components/shared/FileUpload"
import { PodcastContextProvider } from "./context/PodcastContext";
import TitleInput from './components/TitleInput';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const UploadPodcast = () => {

  const [ coverImage, setCoverImage ] = useState(null);
  const [ podcast, setPodcast ] = useState(null);

  return (
    <>
    <PodcastContextProvider>
        <Navbar type="back" showOptions={false} />
        <div className="container">
                <TitleInput />
                
                <div className="flex flex-col my-5">
                    <h3 className='text-lg font-bold underline'>Cover Image for your podcast</h3>
                    <FileUpload file={coverImage} setFile={setCoverImage} type='cover image' />
                </div>

                <div className="flex flex-col my-5">
                    <h3 className='text-lg font-bold underline'>Podcast</h3>
                    <FileUpload file={podcast} setFile={setPodcast} type='podcast' className="text-slate-500"/>
                </div>

                {/* <Quill /> */}
                {/* <PublishBlog file={file} /> */}
        </div>
    </PodcastContextProvider>
      <ToastContainer />
    </>
  )
}

export default UploadPodcast
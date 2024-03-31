import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import Navbar from "components/shared/Navbar"
import Overlay from "components/generic/Overlay";
import { LuSend } from "react-icons/lu";
import { useAxios } from "hooks";
import 'react-quill/dist/quill.snow.css';
import { Spinner } from "react-bootstrap";
import axios from "axios";


const EditPodcast = () => {

  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate(); 
  const { podcastid: id } = useParams();

  const [ fetching, setFetching ] = useState(true);
  const [ title, setTitle ] = useState("");
  
  const [ podcastData, setPodcastData ] = useState({});

  const {
    call,
    loading,
    status_code,
    error
  } = useAxios({
    url: `/api/podcast/${id}/`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  async function fetchPodcastDetails(){
    setFetching(true);
    try {
      const response = await axios.get(`/api/podcast/${id}/`);
      const { title: _title, user_id: _user_id } = response.data;
      setTitle(_title);
      setPodcastData(() => ({
        "owner_id": _user_id,
        "fetchStatus": true
      }))
    } catch (error) {
      setPodcastData(() => ({
        "fetchStatus": false
      }))
      console.log(error)
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchPodcastDetails()
  }, [])

  // If updated redirect.
  useEffect(() => {
    if ([200, 201].includes(status_code)){
      navigate(`/podcast/${id}/`);
    }
  }, [status_code])

  // Update Click Event Handler
  function handleUpdate(){
    const payload = {
      "title": title,
    }
    call(payload);
  }


  if (loading) {
    return (
      <Overlay>
          <div className="flex flex-col items-center">
          <p className="text-lg my-2">Hold on for a moment please, your podcast is being updated.</p>
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
          <p className="text-lg text-red-400 my-2">Error on Updating the podcast.</p>
        </div>
    </Overlay>
    )
  }

  
  // If Invalid podcastid supplied, display 404 
  if (!podcastData?.fetchStatus){
    return <Overlay><p className="text-xl">404 | Not found</p></Overlay>
  }

  // client side validation to check user is authorized to edit the podcast
  if ( podcastData?.owner_id !== user_id ) {
    return (
      <Overlay>
        <div className="flex flex-col items-center">
          <p className="text-lg text-red-400 my-2">Unauthorized to edit this podcast.</p>
        </div>
      </Overlay>
    )
  }


  // Edit Component
  return (
    <>
      <Navbar type="back" />

        
        
      <div className="p-3">
        <p className="my-3 italic text-lg text-blue-900">Note: You can only update the title of the podcast, Delete & Recreate if podcast itself requires the change.</p>
        <input 
          id="title" 
          className='form-control rounded-2xl' 
          placeholder="Title of your Podcast" 
          type="text" 
          name="title" 
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          required />
      </div>

    <div className="flex items-center justify-center my-3">
        <button className="flex items-center gap-1 btn btn-outline-dark" onClick={handleUpdate}>
          Update <LuSend />
        </button>
      </div>
    </>
  )
}

export default EditPodcast;
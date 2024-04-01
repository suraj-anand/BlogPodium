import axios from "axios";
import { ProfileImage } from "components";
import Modal from "components/generic/Modal";
import Overlay from "components/generic/Overlay";
import FileUpload from "components/shared/FileUpload";
import { formatDistance } from "date-fns";
import { useAxios } from "hooks"
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RiRefreshLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const UserInfo = () => {

  const [reload, setReload] = useState(false);
  const userid = localStorage.getItem("user_id");
  const {
    data,
    error,
    loading,
    call
  } = useAxios({
    method:"GET",
    url: `/api/user/${userid}`
  })
  const { name, creation_time, profile } = data;

  useEffect(() => {
    call()
  }, [reload])

  if (error) {
    return <Overlay><p>404 | Not found</p></Overlay>
  }

  return (
    <>
    <div className="flex flex-col gap-1 my-3 items-center justify-center">
      {
        loading ? <Spinner /> :
        <>
          <ProfileImage size={72} imgSrc={profile} userid={userid}  />
          <button data-bs-toggle="modal" data-bs-target="#generic-modal" className="my-1" title="Change Profile">
            <RiRefreshLine size={18} />
          </button>
          <p className="text-3xl mt-3">{name}</p>
          <h5> Joined: { creation_time ? formatDistance(new Date(creation_time), new Date(), { addSuffix: true }) : "" } </h5>
        </>
      }
    </div>
    <ChangeProfileModal setReload={setReload} />
    </>
  )
}

function ChangeProfileModal({setReload}){

  const [ file, setFile ] = useState(null);
  const {
    call,
    loading,
    data,
    status_code,
    error
  } = useAxios({
    url: `/api/update-profile/`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  const saveRef = useRef();
  const closeRef = useRef();
  saveRef.current?.removeAttribute("data-bs-dismiss")

  useEffect(() => {
    const updated = data?.detail === "Updated";
    if (updated){
      closeRef.current?.click();
      setReload((prev) => {return !prev});
      toast("Updated User Profile");
    }
  }, [data])
  
  const handleChangeProfile = async (e) => {
    e.target.classList.add("disabled");
    try {
      call({
        file: file
      })
    } catch (error) {
      console.log(error)
    } 
  }


  return (
    <>

      <Modal 
        title={"Change Profile"}
        closeClass="btn btn-outline-danger"
        handleSave={handleChangeProfile}
        saveName="Update Profile"
        saveClass={`flex items-center gap-2 btn-outline-primary ${file ? "" : "disabled"}`}
        saveIcon={<RiRefreshLine />}
        closeRef={closeRef}
        saveRef={saveRef}
      >

        {
          error && <p className="text-center text-danger fs-5">Profile update failed.</p>
        }

        {
          loading && <Spinner className="d-block mx-auto" />
        }
        <FileUpload 
            file={file} setFile={setFile}
            type="profile image" />
      </Modal>
      <ToastContainer />
    </> 
  )
}

export default UserInfo
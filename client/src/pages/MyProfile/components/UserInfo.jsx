import { ProfileImage } from "components";
import Overlay from "components/generic/Overlay";
import { formatDistance } from "date-fns";
import { useAxios } from "hooks"
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import ChangeProfileModal from "./ChangeProfileModal";
import ChangePassword from "./ChangePassword";
import { RiRefreshLine } from "react-icons/ri";
import { PiDotsThreeVerticalBold, PiPassword } from "react-icons/pi";

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

          <div className="container justify-end flex ms-auto gap-5 dropdown">
            <button type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" >
                <PiDotsThreeVerticalBold className="fw-bolder text-lg" size={36} />
            </button>

            <ul className="dropdown-menu">
              <li data-bs-toggle="modal" data-bs-target="#generic-modal"  className="flex gap-2 items-center dropdown-item hover:text-blue-500">
                <button className="my-1" title="Change Profile">
                  <RiRefreshLine size={22} />
                </button>
                Change Profile
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li data-bs-toggle="modal" data-bs-target="#change-password" className="flex gap-2 items-center dropdown-item hover:text-green-900">
                <button className="my-1" title="Change Profile">
                  <PiPassword size={22} />
                </button>
                Change Password
              </li>
            </ul>
          </div>

          <ProfileImage size={72} imgSrc={profile} userid={userid}  />

          <p className="text-3xl mt-3">{name}</p>
          <h5> Joined: { creation_time ? formatDistance(new Date(creation_time), new Date(), { addSuffix: true }) : "" } </h5>
        </>
      }
    </div>
    <ChangeProfileModal setReload={setReload} />
    <ChangePassword setReload={setReload} />
    </>
  )
}

export default UserInfo
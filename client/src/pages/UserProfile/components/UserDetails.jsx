import { ProfileImage } from "components";
import Overlay from "components/generic/Overlay";
import { formatDistance } from "date-fns";
import { useAxios } from "hooks"
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom"
import UserBlogs from "./UserBlogs";

const UserDetails = () => {

  const { userid } = useParams();
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
  }, [])

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
          <p className="text-3xl mt-3">{name}</p>
          <h5> { creation_time ? formatDistance(new Date(creation_time), new Date(), { addSuffix: true }) : "" } </h5>
        </>
      }
    </div>
    <UserBlogs name={name} />
    </>
  )
}

export default UserDetails
import { Img } from "./Image"
import { FaRegUserCircle } from "react-icons/fa";

export const ProfileImage = ({
  imgSrc="", className
}) => {
  
  if(imgSrc)
    return (
      <Img
        src={imgSrc}
        alt="circleimage"
        className={`h-[70px] w-[70px] rounded-[50%] ${className}`}
      />
    )
  return <FaRegUserCircle size={36} />
}
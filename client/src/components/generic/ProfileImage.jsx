import { Img } from "./Image"

export const ProfileImage = ({
  imgSrc="assets/img_ellipse_5.png", className
}) => {
  return (
    <Img
      src={imgSrc}
      alt="circleimage"
      className={`h-[70px] w-[70px] rounded-[50%] ${className}`}
    />
  )
}
import Navbar from "components/shared/Navbar"
import GetImage from "./components/GetImage"
import { Quill } from "./components/Quill"
import { Offcanvas } from "components/shared/Offcanvas"

const WriteBlog = () => {
  return (
    <>
        <Navbar type="back" showOptions={false} />
        <Offcanvas />
        <GetImage />
        <Quill />
    </>
  )
}

export default WriteBlog
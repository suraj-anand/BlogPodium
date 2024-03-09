import Navbar from 'components/shared/Navbar'
import { Offcanvas } from 'components/shared/Offcanvas'
import YourBlogs from './components/YourBlogs'

const YourItems = () => {
  return (
    <>
        <Navbar />
        <Offcanvas />

        <YourBlogs />
    </>
  )
}

export default YourItems
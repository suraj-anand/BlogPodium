import Navbar from 'components/shared/Navbar'
import { Offcanvas } from 'components/shared/Offcanvas'
import UserBlogs from './components/UserBlogs'

const UserItems = () => {
  return (
    <>
        <Navbar />
        <Offcanvas />

        <UserBlogs />
    </>
  )
}

export default UserItems
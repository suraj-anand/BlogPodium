import Navbar from 'components/shared/Navbar'
import { Offcanvas } from 'components/shared/Offcanvas'
import YourBlogs from './components/YourBlogs'
import YourPodcasts from './components/YourPodcasts'

const YourItems = () => {
  return (
    <>
        <Navbar type='back' />
        <Offcanvas />

        <YourBlogs />
        <YourPodcasts />
    </>
  )
}

export default YourItems
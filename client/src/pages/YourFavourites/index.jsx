import Navbar from 'components/shared/Navbar'
import LikesBlogs from './components/LikesBlogs'
import LikedPodcasts from './components/LikedPodcasts'

const YourFacourites = () => {
  return (
    <>
        <Navbar type='back' />

        <div className="container-fluid">
            <LikesBlogs />
            <LikedPodcasts />
        </div>
    
    </>
  )
}

export default YourFacourites
import Navbar from "components/shared/Navbar"
import TrendingBlogs from "pages/LandingPage/components/TrendingBlogs"

const Blog = () => {
  return (
    <>
        <Navbar type="back" />
        <TrendingBlogs 
            seperate={true}
            className={"my-5"}
            />
    </>
  )
}

export default Blog
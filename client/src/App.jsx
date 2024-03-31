import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  LandingPage,
  Login,
  Register
} from './pages'
import ProtectRoutes from "utils/ProtectRoutes";
import { AuthProvider } from "context/AuthContext";
import Unauthorized from "pages/Unauthorized";
import WriteBlog from "pages/blogs/WriteBlog";
import YourItems from "pages/YourItems/YourItems";
import SingleBlog from "pages/SingleBlog";
import EditBlog from "pages/blogs/components/EditBlog";
import UserProfile from "pages/UserProfile/UserProfile";
import SearchPage from "pages/SearchPage";
import YourFacourites from "pages/YourFavourites";
import PodcastPlayer from "pages/podcasts/PodcastPlayer";
import Podcast from "pages/podcasts/Podcast";
import Blog from "pages/blogs/Blog";
import UploadPodcast from "pages/podcasts/UploadPodcast";
import EditPodcast from "pages/podcasts/EditPodcast";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />      


          {/* Public Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} /> {/* Search */}
          
          {/* Blog */}
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/:blogid" element={<SingleBlog />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/blog/:blogid/edit/" element={<EditBlog />} /> 
          
          {/* Podcast */}
          <Route path="/podcast/" element={<Podcast />} />
          <Route path="/podcast/:podcastid" element={<PodcastPlayer />} />
          <Route path="/upload-podcast" element={<UploadPodcast />} />
          <Route path="/podcast/:podcastid/edit/" element={<EditPodcast />} />

          
          {/* Protected */}
          <Route path="/your-items" element={<YourItems />} />
          <Route path="/your-favourites" element={<YourFacourites />} />

          
          {/* Protected Routes */}
          <Route element={<ProtectRoutes />}>
  
    
            {/* Podcast */}
            <Route path="/user/:userid" element={<UserProfile />} />
          </Route>

          {/* 404 - Page Not Found */}
          <Route path="*" element={<Unauthorized />} />

        </Routes>      
      </Router>
    </AuthProvider>
  );
}

export default App;

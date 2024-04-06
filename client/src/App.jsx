import { HashRouter as Router, Routes, Route } from "react-router-dom";

import {
  LandingPage,
  Login,
  Register,
  Unauthorized,
  WriteBlog,
  YourItems,
  SingleBlog,
  EditBlog,
  UserProfile,
  SearchPage,
  YourFacourites,
  PodcastPlayer,
  Podcast,
  Blog,
  UploadPodcast,
  EditPodcast,
  About,
  MyProfile
} from './pages'
import AuthorizedRoutes from "utils/AuthorizedRoutes";
import { AuthProvider } from "context/AuthContext";

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
          <Route path="/about" element={<About />} /> {/* About Page */}
          
          {/* Blog */}
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/:blogid" element={<SingleBlog />} />
          
          {/* Podcast */}
          <Route path="/podcast/" element={<Podcast />} />
          <Route path="/podcast/:podcastid" element={<PodcastPlayer />} />

          <Route element={<AuthorizedRoutes />}>
            <Route path="/your-items" element={<YourItems />} />
            <Route path="/your-favourites" element={<YourFacourites />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/blog/:blogid/edit/" element={<EditBlog />} /> 
            <Route path="/upload-podcast" element={<UploadPodcast />} />
            <Route path="/podcast/:podcastid/edit/" element={<EditPodcast />} />
            <Route path="/my-profile/" element={<MyProfile />} />
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

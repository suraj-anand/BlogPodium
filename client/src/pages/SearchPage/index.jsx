import Navbar from 'components/shared/Navbar';
import Search from 'components/shared/Search';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchedBlogs from './components/SearchedBlogs';

const SearchPage = () => {

  const [params, setParams] = useSearchParams();
  const query = params.get("query")
  const type = params.get("type")

  const [ showSearch, setShowSearch ] = useState(false);

  return (
    <>
      <Navbar handleSearchClick={ () => {setShowSearch(p => (!p))} } />
      <Search show={showSearch} />

      {
        type.toLowerCase() === "blog" &&
          <div className="flex flex-col justify-center min-h-[84vh] gap-32 my-5 ">
            <SearchedBlogs query={query} />
          </div>
      }
      
    </>
  )
}

export default SearchPage
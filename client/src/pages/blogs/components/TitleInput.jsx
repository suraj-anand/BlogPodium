import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext';

const TitleInput = () => {

    const { title, setTitle } = useContext(BlogContext);

    return (
        <>
            <input 
                id="title" 
                className='form-control rounded-2xl' 
                placeholder="Title of your Blog" 
                type="text" 
                name="title" 
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                required />
        </>
    )
}

export default TitleInput
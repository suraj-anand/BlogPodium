import { useContext } from 'react'
import { PodcastContext } from '../context/PodcastContext';

const TitleInput = () => {

    const { title, setTitle } = useContext(PodcastContext);

    return (
        <>
            <input 
                id="title" 
                className='form-control rounded-2xl' 
                placeholder="Title of your Podcast" 
                type="text" 
                name="title" 
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                maxLength={30}
                required />
        </>
    )
}

export default TitleInput
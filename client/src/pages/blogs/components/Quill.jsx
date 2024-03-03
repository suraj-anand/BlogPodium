import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../styles.css"
import { BlogContext } from '../context/BlogContext';

export function Quill() {
  
    const { content, setContent } = useContext(BlogContext)

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    return (
        <ReactQuill theme="snow" 
            value={content} 
            onChange={e => {setContent(e)}} 
            // formats={formats}
            placeholder='Write your blog content'
            modules={modules}
            />
    )
}
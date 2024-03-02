import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../styles.css"

export function Quill() {
  
    const [value, setValue] = useState('');
    const formats = [
        'font','size',
        'bold','italic','underline','strike',
        'color','background',
        'script',
        'header','blockquote','code-block',
        'indent','list',
        'direction','align',
        'link','image','video','formula',
      ]

    // const modules = {
    //     toolbar: {
    //         container: "#toolbar",
    //     }
    // }

    useEffect(() => {
        console.log(value)
    },[value])

    return (
        <ReactQuill theme="snow" 
            value={value} 
            onChange={setValue} 
            formats={formats}
            // modules={modules}
            />
    )
}
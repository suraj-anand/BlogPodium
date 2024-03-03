import { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RiRefreshLine } from "react-icons/ri";
import { Img } from '../../../components/generic/Image';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BlogContext } from '../context/BlogContext';

const CoverImageUpload = ({file, setFile}) => {

    const onDrop = useCallback(acceptedFiles => {
        const _file = acceptedFiles.at(0);
        if (!_file.type.includes("image")) {
            toast("The selected file is not an image.")
        } else {
            setFile(_file);
        }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: "image"})
      
    return (
    <>
    
    {/* If image selected */}
    {
        file?.type?.includes("image") &&
        <>
        <button className='btn flex ms-auto' title="Change Image" onClick={() => {setFile(null)}}>
            <RiRefreshLine fontSize={24} />
        </button>
        <Img
            src={URL.createObjectURL(file)}
            alt="image" 
            className="rounded-xl justify-center h-[207px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover p-2"
            />
        </>
    }

    {
        !file?.type?.includes("image") && 
        <div {...getRootProps()} className={`p-3 text-center border-1 my-3 shadow-sm rounded-lg ${isDragActive ? "bg-slate-400 rounded-none" : ""}`}>
                <>
                <input {...getInputProps()} />
                <div className="text-lg text-blue-900 font-bold">
                    {
                        isDragActive ?
                        <p>Drop the image here</p> :
                        <p>Drag 'n' drop the cover image here, or click to select the image</p>
                    }
                </div>
                </>
        </div>
    }

    </>
    )
}

export default CoverImageUpload
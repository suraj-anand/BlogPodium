import React from 'react'

const GetImage = () => {
  return (
    <div className='flex'>
        <label htmlFor="image">Select or Drag & Drop the Cover Image</label>
        <input type="file" name="" id="image" />
    </div>
  )
}

export default GetImage
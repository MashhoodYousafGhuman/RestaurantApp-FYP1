import React, { useState } from 'react'

export default function Cloudinary() {
    const [image, setImage] = useState('')
    console.log('image', image)
    const handleFile = (e) => {
        setImage(e.target.files[0])
        console.log('image', image.url)
        console.log('e.target.files', e.target.files)
        // console.log('file.url', file.url)
    }
    return (
        <>
            <input type="file" onChange={handleFile} />

        </>
    )
}

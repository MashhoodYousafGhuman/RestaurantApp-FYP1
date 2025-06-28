// import React, { useState } from 'react'

// export default function Cloudinary() {

//     const [imageUrl, setImageUrl] = useState('');

//     const handleUpload = async (event) => {
//         const file = event.target.files[0]; // Get selected image

//         const formData = new FormData();
//         formData.append('file', file); // 👈 actual image file
//         formData.append('upload_preset', 'restaurant-app'); // 👈 your preset name
//         formData.append('cloud_name', 'dblqccgby'); // 👈 your Cloudinary cloud name

//         // 🔼 Step: send to Cloudinary
//         const res = await fetch('https://api.cloudinary.com/v1_1/dblqccgby/image/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         const data = await res.json();
//         setImageUrl(data.secure_url); // 👈 show the uploaded image URL
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleUpload} />
//             {imageUrl && <img src={imageUrl} alt="Uploaded" width="200" />}
//         </div>
//     );
// }
// import React, { useState } from 'react';

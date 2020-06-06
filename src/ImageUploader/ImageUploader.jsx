import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
const CLOUDINARY_UPLOAD_PRESET = 'k21wtmfa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mielproject/image/upload';
// const CLOUD_NAME = 'mielproject';

function ImageUploader() {

    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [uploadedFile, SetUploadedFile] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        SetUploadedFile(acceptedFiles[0]);
        handleImageUpload(acceptedFiles[0]);
    }, [])

    const handleImageUpload= (file) =>{
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); 
    
        fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.secure_url !== '') {
                SetUploadedFileCloudinaryUrl(data.secure_url)              
            }
          })
          .catch(err => console.error(err))
      }

    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/png', multiple: false, onDrop
    })

    //Claudinary integration with Widget
    // const widget = window.cloudinary.createUploadWidget({
    //     cloudName: CLOUD_NAME,
    //     uploadPreset: CLOUDINARY_UPLOAD_PRESET
    // }, (error, result) => {console.log(result) })

    // const showWidget = () => {
    //     widget.open();
    // }


    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <div>
                {uploadedFileCloudinaryUrl === '' ? null :
                    <div>
                        <p>{uploadedFile.name}</p>
                        <img src={uploadedFileCloudinaryUrl} />
                    </div>}
            </div>

            {/* <div id='photo-form-container'>
                <button onClick={showWidget}>Upload Photo</button>
            </div> */}
        </div>
    )
}

export default ImageUploader
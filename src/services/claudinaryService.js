
const claudinaryService = {
    upload: async (file) => {
        
        const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
        const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        try {
            const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw Error('File to upload image. Please try again.')
            }
            const data = await response.json();
            return {url: data.secure_url}
            
        } catch (error) {
            return {error: error.message}
        }
    }, 
    
    delete: async(imageUrl)=>{
        const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}delete-image`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify({imageUrl}),
            credentials: 'include'
          });
    } 
};

export default claudinaryService
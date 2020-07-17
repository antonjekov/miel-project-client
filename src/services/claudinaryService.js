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
            const data = await response.json();
            if (data && data.secure_url !== '') {
                return {
                    url: data.secure_url,
                    error: ''
                }
            }
        } catch (error) {
            return {
                url: undefined,
                error: 'File to upload image. Please try again.'
            }
        }
    }
};

export default claudinaryService
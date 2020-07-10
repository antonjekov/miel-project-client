const subcategoryService = {
    getByCategory:  (category) =>{
        return fetch(`http://localhost:3006/subcategories/${category}`, {
            method: 'GET',
            credentials: 'include'
          });
    },

    add: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/add-subcategory`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    }
    
};

export default subcategoryService


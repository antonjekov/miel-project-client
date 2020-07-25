const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const subcategoryService = {
    getByCategory:  (category) =>{
        return fetch(`${REACT_APP_SERVER_API_URL}subcategories/${category}`, {
            method: 'GET',
            credentials: 'include'
          });
    },

    add: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}add-subcategory`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },

    allProductsInSubcat: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}subcategory/products`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    }
    
};

export default subcategoryService


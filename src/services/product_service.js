const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const productService = {
    add:  (data) =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}add-product`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },
    
    getAll: ()=>{
        return fetch(`${REACT_APP_SERVER_API_URL}products`, {
            method: 'GET',
            credentials: 'include'
          });
    },

    delete: (productId)=>{
        return fetch(`${REACT_APP_SERVER_API_URL}products-delete/${productId}`, {
            method: 'GET',
            credentials: 'include'
          });
    }
};

export default productService
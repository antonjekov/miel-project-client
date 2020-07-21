const productService = {
    add:  (data) =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/add-product`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },
    
    getAll: ()=>{
        return fetch(`http://localhost:3006/products`, {
            method: 'GET',
            credentials: 'include'
          });
    },

    delete: (productId)=>{
        return fetch(`http://localhost:3006/products-delete/${productId}`, {
            method: 'GET',
            credentials: 'include'
          });
    }
};

export default productService
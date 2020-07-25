const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const shoppingCartService = {
    
    shoppingCartGet: ()=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}shoppingCard/get`, {
            method: 'POST',
            headers:headers,
            credentials: 'include'
          });        
    },

    shoppingCardAdd: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}shoppingCard/add`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    shoppingCartCheckout: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}shoppingCart/checkout`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    deleteAllFromShoppingCart: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}shoppingCart/deleteAll`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    deleteOneFromShoppingCard: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}shoppingCart/deleteOne`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });    
    }    
};

export default shoppingCartService
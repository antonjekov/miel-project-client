const userService = {
    login:  (data) =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/login`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },

    register: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/register`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    logout: ()=>{
        return fetch(`http://localhost:3006/logout`, {
            method: 'POST',
            credentials: 'include'            
          });
    },

    getInfoForUser: ()=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/user/getInfoForUser`, {
            method: 'POST',
            headers:headers,
            credentials: 'include'
          }); 
    },

    shoppingCartGet: ()=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCard/get`, {
            method: 'POST',
            headers:headers,
            credentials: 'include'
          });        
    },

    shoppingCardAdd: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCard/add`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    shoppingCartCheckout: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCart/checkout`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    deleteAllFromShoppingCart: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCart/deleteAll`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    deleteOneFromShoppingCard: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCart/deleteOne`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });    
    }

    
};

export default userService
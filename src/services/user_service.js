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

    shoppingCartGet: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCard/get`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
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

    deleteFromShoppingCard: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`http://localhost:3006/shoppingCard/delete`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    }
};

export default userService
const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const userService = {
    login:  (data) =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}login`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },

    register: (data)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}register`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });        
    },

    logout: ()=>{
        return fetch(`${REACT_APP_SERVER_API_URL}logout`, {
            method: 'POST',
            credentials: 'include'            
          });
    },

    getInfoForUser: ()=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}user/getInfoForUser`, {
            method: 'POST',
            headers:headers,
            credentials: 'include'
          }); 
    },

};

export default userService
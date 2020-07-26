const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const messageService = {
    send:  (data) =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}send-message`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data),
            credentials: 'include'
          });
    },

};

export default messageService
const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const categoryService = {
    getAll:  () =>{
        return fetch(`${REACT_APP_SERVER_API_URL}categories`, {
            method: 'GET',
            credentials: 'include'
          });
    },
};

export default categoryService
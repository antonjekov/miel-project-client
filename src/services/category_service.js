const categoryService = {
    getAll:  () =>{
        return fetch(`http://localhost:3006/categories`, {
            method: 'GET',
            credentials: 'include'
          });
    },
};

export default categoryService
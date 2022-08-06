import axios from "axios";

const baseUrl =  `${process.env.REACT_APP_WEB_API_URL}/api/ToDo`

export const configAxios = () => {
    axios.defaults.baseURL = baseUrl;
  
    axios.interceptors.response.use(
      function (response) {
        debugger;
        if (response.data) {
          // return success
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          // reject errors & warnings
          return Promise.reject(response);
        }
  
        // default fallback
        return Promise.reject(response);
      },
      function (error) {
        // if the server throws an error (404, 500 etc.)
        return Promise.reject(error);
      }
    );
  };

export const loadTodos = () => {
    return fetch(baseUrl).then((res) => 
    res.json());
}

export const getTodo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(baseUrl, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: todo.name,
            status: todo.status,
            priority: todo.priority
        }),
    }).then((res) => res.json());
}

export const updateTodo = (todoItem) => {
    const headers = { 
      "Content-Type":"application/json"
  };
    const todo = { 
                   id:todoItem.Id, 
                   Id: todoItem.Id,
                   "Name": todoItem.Name,
                   Status: todoItem.Status,
                   Priority: todoItem.Priority
                 };
    return axios.put(`${baseUrl}/${todoItem.Id}`, todo, { headers });
}
export const deleteTodo = async(id) => {
    return axios.delete(`${baseUrl}/${id}`, configAxios);
}
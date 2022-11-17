import { delay } from '@/model/utils/generalUtils.js';

function  processResponse(response, methodName) {
  console.log(`>ServerService -> requestTodos: response.data =`, response);
  if(response.ok === false) throw new Error ();
  return response.json();
}

const DATA_TODO_lIST_RESOURCE = 'todos';
class ServerService {
  constructor(url) {
    console.log('> ServerService -> constructor', url);
    this.url = url;
  }

  get path(){
    return `${this.url}/${DATA_TODO_lIST_RESOURCE}`
  }

    async requestTodos(){                                                  // функция помечена асинк и есть новый промис
      console.log(`>ServerService -> requestTodos`);
      try {
        const listOfTodos = await fetch(this.path, {
          method: 'GET',
             }).then((response) => processResponse(response, 'requestTodos'))
              return listOfTodos;
         } catch (error) {
        console.log(`>ServerService -> requestTodos: error = ${error}`);
         throw error
       }
     }

  async saveTodo(todoVO) {
    return fetch(`${this.path}/${todoVO.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(todoVO),
    })
      .then((response) => processResponse(response, 'saveTodo'))
      .catch((error) => {
      console.log(`>ServerService -> saveTodo:error = ${error}`);
      throw error;
    })
  };
}

export default ServerService;
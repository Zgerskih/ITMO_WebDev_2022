import { delay } from '@/model/utils/generalUtils.js';

const CONST_WELCOME = 'Welcome';

class ServerService {
  constructor(url) {
    this.url = url;
    console.log('> ServerService -> constructor', url);
  }

    async requestTodos(){                                                  // функция помечена асинк и есть новый промис
      console.log(`>ServerService -> requestTodos: ${CONST_WELCOME}`);
      const data = await fetch(`${this.url}/todos`, {
        method: 'GET',
      })
        .then((response)=>{
          console.log(`>ServerService -> requestTodos: response.data =`, response);
          return response.ok ? response.json() : new Error('')
        })
        .catch((e) => {
        console.log(`>ServerService -> requestTodos: error = ${e}`);
        return [];
      });
           console.log(`>ServerService -> requestTodos: data =`, data);
      await delay(3000);
      return data;
    };
  }

export default ServerService;
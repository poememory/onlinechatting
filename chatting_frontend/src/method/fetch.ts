const Prurl="http://localhost:3000/api";
const headers= {
    'Content-Type': 'application/json',
  }

interface Request{
    method: string;
    url:string;
    content?:any;
  }
  
  export const fetchApi = async <T>(
    options: Request
  ): Promise<T> => {  
    try {
      const response = await fetch(Prurl+options.url,{method:options.method,headers:headers,body:JSON.stringify(options.content)});
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
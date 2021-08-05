import axios, { AxiosResponse }  from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/Activity";
import { IUser, IUserFormValues } from "../models/IUser";


axios.defaults.baseURL='http://localhost:5000/api';
axios.interceptors.response.use(undefined, error=>{
    const {status,data,config} = error.response;
    if(error.message === 'Network Error' && !error.response){
        toast.error('network error');
    }
    if(error.response.status === 404){
       history.push('/notFound')
       toast.error('Server error check the terminal for more info');
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')
    ){
            history.push('/notfound');
    }
    if(status === 500){
        toast.error('Server error check the terminal for more info');
    }
    throw error.response;

})
const responseBody = (response : AxiosResponse ) => response.data;
const sleep =(ms:number)=>(response:AxiosResponse) =>
new Promise<AxiosResponse>(resolve =>setTimeout(()=> resolve(response),ms))
const request={

    get:(url:string)=> axios.get(url).then(sleep(1000)).then(responseBody),
    post:(url:string, body:{})=>axios.post(url,body).then(sleep(1000)).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(sleep(1000)).then(responseBody),
    del:(url:string)=> axios.delete(url).then(sleep(1000)).then(responseBody)
}
const Activities={
    list:(): Promise<Activity[]>=> request.get('/activities'),
    details:(id:string) => request.get(`/activities/${id}`),
    create:(activity:Activity)=> request.post('/activities',activity),
    update:(activity:Activity)=>request.put(`/activities/${activity.id}`,activity),
    delete:(id:string)=>request.del(`/activities/${id}`)

}
const User={
    current: (): Promise<IUser> => request.get('/user'),
    login:(user:IUserFormValues):Promise<IUser> => request.post(`/user/login`,user),
    register:(user:IUserFormValues):Promise<IUser> => request.post('/user/register',user),
}
export default{
    Activities,
    User
}
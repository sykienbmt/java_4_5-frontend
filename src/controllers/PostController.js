import axios from "axios";
import { backendUrl } from "src/constraint";

class PostController{


    async list(){
        return axios.get(backendUrl+'post-lab6').then(res=>{
            return res.data
        })
    }

    async create(category){
        return axios.post(backendUrl+'post-lab6',category).then(res=>{
            return res.data
        })
    }

    async edit(category){
        return axios.put(backendUrl+'post-lab6',category).then(res=>{
            return res.data
        })
    }

    async delete(id){
        return axios.delete(backendUrl+`post-lab6/${id}`).then(res=>{
            return res.data
        })
    }

    async getById(id){
        return axios.get(backendUrl+`post-lab6/${id}`).then(res=>{
            return res.data
        })
    }

    async searchByName(nameSearch){
        console.log(nameSearch);
        return axios.post(backendUrl+`post-lab6/search`,nameSearch).then(res=>{
            console.log(res.data);
            return res.data
        })
    }
}


export const postController = new PostController()
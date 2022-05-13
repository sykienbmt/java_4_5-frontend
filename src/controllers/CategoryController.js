import axios from "axios";
import { backendUrl } from "src/constraint";

class CategoryController{
    
    // async isAdmin(){
    //     return authAxios.get(backendUrl+'admin').then(res=>{
    //         return res.data
    //     })
    // }

    async list(){
        return axios.get(backendUrl+'category').then(res=>{
            return res.data
        })
    }

    async create(category){
        return axios.post(backendUrl+'category',category).then(res=>{
            return res.data
        })
    }

    async edit(category){
        return axios.put(backendUrl+'category',category).then(res=>{
            return res.data
        })
    }

    async delete(id){
        return axios.delete(backendUrl+`category/${id}`).then(res=>{
            return res.data
        })
    }
}


export const categoryController = new CategoryController()
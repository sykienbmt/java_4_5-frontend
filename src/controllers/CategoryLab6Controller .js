import axios from "axios";
import { backendUrl } from "src/constraint";
import { authAxios } from "./Auth";

class CategoryLab6Controller{


    async list(){
        return authAxios.get(backendUrl+'category-lab6').then(res=>{
            return res.data
        })
    }

    async create(category){
        return authAxios.post(backendUrl+'category-lab6',category).then(res=>{
            return res.data
        })
    }

    async edit(category){
        return authAxios.put(backendUrl+'category-lab6',category).then(res=>{
            return res.data
        })
    }

    async delete(id){
        return authAxios.delete(backendUrl+`category-lab6/${id}`).then(res=>{
            return res.data
        })
    }

    async searchByName(nameSearch){
        console.log(nameSearch);
        return authAxios.post(backendUrl+`category-lab6/search`,nameSearch).then(res=>{
            console.log(res.data);
            return res.data
        })
    }
}


export const categoryLab6Controller = new CategoryLab6Controller()
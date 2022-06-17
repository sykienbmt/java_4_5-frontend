import axios from "axios";
import { backendUrl } from "src/constraint";
import { authAxios } from "./Auth";

class ProductController{
    
    async list(){
        return authAxios.get(backendUrl+'products').then(res=>{
            return res.data
        })
    }

    async add(product){
        return authAxios.post(backendUrl+'products',product).then(res=>{
            return res.data
        })
    }

    async edit(product){
        return authAxios.put(backendUrl+'products',product).then(res=>{
            return res.data
        })
    }

    async delete(id){
        return authAxios.delete(backendUrl+`products/${id}`).then(res=>{
            return res.data
        })
    }

    async getProduct(id){
        return authAxios.get(backendUrl+`products/${id}`).then(res=>{
            return res.data
        })
    }

    async listWithPagination(pagination){
        return authAxios.put(backendUrl+`products/pagination`,pagination).then(res=>{
            let totalPage = Math.ceil(res.data.count/ pagination.perPage)
            let total = res.data.count
            let listProduct=res.data.list
            return {totalPage,total,listProduct}
        })
    }
}


export const productController = new ProductController()
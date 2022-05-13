import axios from "axios";
import { backendUrl } from "src/constraint";

class ProductController{
    
    async list(){
        return axios.get(backendUrl+'products').then(res=>{
            return res.data
        })
    }

    async add(product){
        return axios.post(backendUrl+'products',product).then(res=>{
            return res.data
        })
    }

    async edit(product){
        return axios.put(backendUrl+'products',product).then(res=>{
            return res.data
        })
    }

    async delete(id){
        return axios.delete(backendUrl+`products/${id}`).then(res=>{
            return res.data
        })
    }

    async getProduct(id){
        return axios.get(backendUrl+`products/${id}`).then(res=>{
            return res.data
        })
    }

    async listWithPagination(pagination){
        return axios.put(backendUrl+`products/pagination`,pagination).then(res=>{
            let totalPage = Math.ceil(res.data.count/ pagination.perPage)
            let total = res.data.count
            let listProduct=res.data.list
            return {totalPage,total,listProduct}
        })
    }
}


export const productController = new ProductController()
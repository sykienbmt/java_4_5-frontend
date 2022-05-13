import axios from "axios";
import { backendUrl } from "src/constraint";

class OrderController{

    async create(orders){
        return axios.post(backendUrl+'orders',orders).then(res=>{
            return res.data
        })
    }

    async saveItem(item){
        return axios.post(backendUrl+'orders/item',item).then(res=>{
            return res.data
        })
    }

    async getInfoOrder(id){
        return axios.get(backendUrl+`orders/get/${id}`).then(res=>{
            return res.data
        })
    }


    async getOrders(id){
        return axios.get(backendUrl+`orders/${id}`).then(res=>{
            let arrRaw = res.data
            let listIdOrder = arrRaw.map(item=>item.id_order)
            listIdOrder=Array.from(new Set(listIdOrder));

            let listOrder=[]

            listIdOrder.map(idOrder=>{
                
                let itemOrder= {
                    orderInfo: idOrder,
                    items:[]
                }

                arrRaw.map(item=>{
                    if (item.id_order==idOrder) {
                        itemOrder.items.push({
                            id_product:item.id_product,
                            quantity:item.quantity,
                            price:item.price,
                            image:item.image,
                            category:item.category,
                            name:item.name,
                        })
                    }
                })
                listOrder.push(itemOrder)
            })
            return listOrder;
        })
    }

    // async sendMail(mailSend){
    //     return axios.post("http://localhost:8080/orders/send",mailSend).then(res=>{
    //         console.log(res);
    //         return res
    //     })
    // }
    
    async sendMail(mailSend){
        console.log(mailSend);
        return axios.post(backendUrl+`orders/send`,mailSend).then(res=>{
            return res.data
        })
    }

}


export const orderController = new OrderController()
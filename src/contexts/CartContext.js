import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userController } from "src/controllers/UserController";
import { getCookie } from "src/helper/Cookies";
import { UserContext } from "./UserContext";
import { v4 as uuidv4 } from 'uuid';
import {orderController} from '../controllers/OrderController'

export const CartContext = createContext();

export const CartContextProvider =(props)=>{

    const [state,setState]=useState({itemCarts:[]})

    const userContext = useContext(UserContext)
    // console.log(userContext.state.userInfo);
    useEffect(()=>{
        if(userContext.state.userInfo!==""){
            if(localStorage.getItem('carts')!==null){
                let listLocal = JSON.parse(localStorage.getItem("carts"))
                let index= listLocal.findIndex(i=>i.id===userContext.state.userInfo.id)

                if(index!==-1){
                    localStorage.setItem('userCart',JSON.stringify(listLocal[index]))
                    setState(prev=>({...prev,itemCarts:listLocal[index].item}))
                }else{
                    let userCart={
                        id:userContext.state.userInfo.id,
                        item:[]
                    }
                    listLocal.push(userCart)
                    localStorage.setItem('userCart',JSON.stringify(userCart))
                    localStorage.setItem('carts',JSON.stringify(listLocal))
                    setState(prev=>({...prev,itemCarts:[]}))
                }

            }else{
                let listCart=[]
                setState(prev=>({...prev,itemCarts:[]}))
                let userCart={
                    id:userContext.state.userInfo.id,
                    item:[]
                }
                listCart.push(userCart)
                localStorage.setItem('userCart',JSON.stringify(userCart))
                localStorage.setItem('carts',JSON.stringify(listCart))
            }
        }
    },[userContext.state.userInfo])

    const addToCart=(product)=>{
        let cart = getItemLocal();
        if(cart.length==0){
            console.log("null cart");
            cart.push(product)
        }else{
            let index = cart.findIndex(i=>i.id==product.id)
            if(index>-1){
                console.log("exists");
                    cart[index].quantity=cart[index].quantity+1
                }else{
                console.log("no add");
                cart.push(product)
            }
        }
        setItemLocal(cart)
        setState(prev=>({...prev,itemCarts:cart}))
        userContext.setMess("Add To Cart Done")
    }

    const changeQuantity=(product,quantity)=>{
        let cart=getItemLocal()
        let index = cart.findIndex(i=>i.id==product.id)
        cart[index].quantity=quantity
        setState(prev=>({...prev,itemCarts:cart}))
        setItemLocal(cart)
        userContext.setMess("Change quantity done")

    }

    const removeFromCart=(id)=>{
        let cart=getItemLocal()
        let index= cart.findIndex(i=>i.id===id)
        if(index!==-1){
            cart.splice(index,1);
        }
        setState(prev=>({...prev,itemCarts:cart}))
        setItemLocal(cart)
        userContext.setMess("Remove from cart done")
    }

    const getItemLocal =()=>{
        let arr=[]
        let list = JSON.parse(localStorage.getItem('userCart'))
        arr=list.item
        return arr;
    }

    const setItemLocal =(arr)=>{
        console.log();
        // console.log(arr);
        const cart={
            id:userContext.state.userInfo.id,
            item:arr
        }
        let listCarts = JSON.parse(localStorage.getItem('carts'))
        let index = listCarts.findIndex(i=>i.id==userContext.state.userInfo.id)
        listCarts[index]=cart

        localStorage.setItem('userCart',JSON.stringify(cart))
        localStorage.setItem('carts',JSON.stringify(listCarts))
    }
    


    const checkout=(user)=>{
        user.id=uuidv4();
        let total=0;
        orderController.create(user).then(res=>{
            state.itemCarts.map(item=>{
                const itemCarts={
                    id_order:user.id,
                    id_product:item.id,
                    name:item.name,
                    price:item.price,
                    category:item.category,
                    image:item.image,
                    quantity:item.quantity,
                    id_user:userContext.state.userInfo.id
                }
                total+=item.price* item.quantity
                orderController.saveItem(itemCarts).then(res=>{
                })
            })

        })
        
        setState(prev=>({...prev,itemCarts:[]}))
        setItemLocal([])
        userContext.setMess("Order Successfully!")
    }

    return (
        <CartContext.Provider value={{removeFromCart,addToCart,changeQuantity,state,checkout}}>
            {props.children}
        </CartContext.Provider>
    )

}
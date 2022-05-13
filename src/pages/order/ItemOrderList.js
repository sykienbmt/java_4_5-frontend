import React, { useEffect, useState } from 'react'
import { orderController } from 'src/controllers/OrderController';
// import { OrderWithDetailAddress } from '../../model/Order';
import ItemChildOrder from './ItemChildOrder';


export default function ItemOrderList(props) {

    const [userInfo,setUserInfo] = useState("")

    const sumToTal = ()=>{
        let  total=0
        props.itemOrder.items.map(item=>{
            total+= item.price*item.quantity
        })
        return total
    }

    useEffect(()=>{
        orderController.getInfoOrder(props.itemOrder.orderInfo).then(res=>{
            setUserInfo(res)
        })
    },[])

    return (
        <div className="order-history-item">
            <div className="order-history-item-info">
                <div className="order-history-shop">
                    <i className="fas fa-store-alt"></i>
                    <h3 className="order-shop-name">Shop Starr</h3>
                    <button className="order-shop-go btn">ViewShop</button>
                </div>
                <h4>{props.itemOrder.status}</h4>
                <div className="order-information">
                    <div className="order-info-time">
                        <p>{props.itemOrder.closeAt}</p>
                    </div>
                    {userInfo!==""?
                    <p className="order-info-address"><span>{userInfo.email+" | "+userInfo.phone_number +" | "+ userInfo.address}</span> </p>
                    :""    
                }
                </div>
            </div>
            {props.itemOrder.items.map(item=><ItemChildOrder key={item.id_product} itemChild={item}/>)}


            <div className="order-item-price">
                <div className="order-item-price-left">
                    <p className="order-item-cost">Cost: <span>{sumToTal()} $</span></p>
                    <p className="order-item-cost">Ship: <span>0 $</span></p>
                </div>
                <div className="order-item-price-total">
                    Total: <span>{sumToTal()} $</span>
                </div>
            </div>
        </div>
    )
}
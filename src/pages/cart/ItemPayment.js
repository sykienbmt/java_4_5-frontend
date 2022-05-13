import React from 'react';

export default function ItemPayment(props) {
  return <div className="payment-item-order">
            <div className='payment-item-order-img'>
                <img src={props.item.image} alt="" />
                <div className="item-quantity-payment">
                    {props.item.quantity}
                </div>
            </div>
            <p key ={props.item.id} className=''>
                    <span>{props.item.name} </span> 
                    <span>$ {props.item.quantity*props.item.price}</span>
            </p>
        </div>
}

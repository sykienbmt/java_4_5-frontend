import React, { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import './Cart.css'
import { BsFillCartXFill } from "react-icons/bs";
import CartItemForm from './CartItemForm'
import CheckOutForm from './CheckOutForm'
import Header from 'src/components/home/Header';
import { Button } from '@mui/material';


export default function Cart() {
    const [state,setState]=useState({isShowPayment:false})
    const cartContext =  useContext(CartContext)
    
    return (
        <>
            <Header />
            <div className='cart-page-container' style={{background:'white'}}>
                {cartContext.state.itemCarts.length>0? <div className="cart-page-content">
                    <div className="process-container">

                    </div>
                    <div className="cart-content-container">
                        {state.isShowPayment? <CheckOutForm/>: <CartItemForm />}
                    </div>

                    <div className="button-change-payment">
                        <Button variant='contained'
                            onClick={()=>setState({...state,isShowPayment:!state.isShowPayment})}
                        >
                            {state.isShowPayment===true? `Back to cart` : `Back to Shop ` }
                        </Button>

                        {state.isShowPayment===false? 
                            <Button onClick={()=>setState({...state,isShowPayment:!state.isShowPayment})}
                            variant="contained"
                        >
                            Checkout
                        </Button>
                        : "" }
                        
                    </div>
                </div> : 
                <div className='cart-null-container'>
                    <BsFillCartXFill style={{fontSize:"120px"}}/>
                    <h1 style={{textAlign:"center"}}>Your cart is Empty !</h1>
                </div>
                }
                
            </div>
        </>
    )
}

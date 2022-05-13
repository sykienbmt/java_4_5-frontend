import React, { useContext } from 'react';
import { CartContext } from 'src/contexts/CartContext';
import './CartTable.css'
import ItemCartTable from './ItemCartTable';



export default function CartItemForm() {

    const cartContext = useContext(CartContext)

    const total = ()=>{
        let total =0;
        cartContext.state.itemCarts.map(item=>{
            total+=( item.quantity* item.price)
        })
        return total
    }

    return <div className="table-item-cart">
            <table className="show-list">
                <tbody>
                    <tr className="table-title">
                        <th style={{textAlign:"center"}}><p>Image</p></th>
                        <th style={{textAlign:"center"}}><p>Product info</p></th>
                        <th style={{textAlign:"center"}}><p>Quantity</p></th>
                        <th style={{textAlign:"center"}}><p>Subtotal</p></th>
                        <th style={{textAlign:"center"}}><p>Remove</p></th>
                    </tr>
                    
                    {cartContext.state.itemCarts.length>0 && cartContext.state.itemCarts.map(item=><ItemCartTable key={item.id}
                        itemCart={item}
                    />)}
                    
                    <tr className="table-row">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='table-column-2'>Total</td>
                        <td className='table-column-3'><span>$ {total()}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
}

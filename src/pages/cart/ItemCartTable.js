import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CartContext } from 'src/contexts/CartContext';

// interface Props{
//     itemCart:ItemCart
// }

// type State={
//     quantity:number
// }

export default function ItemCartTable(props) {
  const cartContext = useContext(CartContext);
  const [state, setState] = useState({ quantity: props.itemCart.quantity });

  const onCLickPlus = () => {
    setState({ ...state, quantity: state.quantity + 1 });
    cartContext.changeQuantity(props.itemCart,state.quantity + 1);
  };

  const onCLickMinus = () => {
    if (state.quantity > 1) {
      setState({ ...state, quantity: state.quantity - 1 });
      cartContext.changeQuantity(props.itemCart,state.quantity - 1);
    }
  };

  return (
    <tr className="table-row-content">
      <td className="table-column">
        <img src={props.itemCart.image} alt="" />
      </td>
      <td className="table-column-1">
        <div className="item-cart-render">
          <div className="item-cart-info">
            <p className="item-cart-name">Name: {props.itemCart.name}</p>
            <small style={{ display: 'block' }} className="item-cart-price">
              Price: $ {props.itemCart.price}
            </small>
          </div>
        </div>
      </td>

      <td className="table-column-2">
        <div className="box-change-quantity">
          <button onClick={() => onCLickMinus()}>-</button>

          <input
            type="number"
            min={1}
            id=""
            value={state.quantity}
            onChange={(e) => ''}
            style={{ height: '30px', border: '2px solid #76A822' }}
          />

          <button onClick={() => onCLickPlus()}>+</button>
        </div>
      </td>
      <td className="table-column-3"> $ {props.itemCart.quantity * props.itemCart.price}</td>
      <td className="table-column-4">
        {' '}
        <RiDeleteBin6Line
          fontSize={'22px'}
          onClick={() => cartContext.removeFromCart(props.itemCart.id)}
        />{' '}
      </td>
    </tr>
  );
}

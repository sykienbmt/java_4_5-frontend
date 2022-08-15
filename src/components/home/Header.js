import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from 'src/contexts/CartContext';
import { UserContext } from 'src/contexts/UserContext';
import { setCookie } from 'src/helper/Cookies';
// import '../../css/bootstrap.css';
import '../../css/style.css';

export default function Header() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext)
  const {state} = useContext(UserContext)
  const navigate = useNavigate()
  

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header-left">
              <div className="logo">
                <Link to={'/home'}>
                  <img src="images/logo.png" alt="" />
                </Link>
              </div>
              <div className="menu">
                <a className="toggleMenu" href="#">
                  <img src="images/nav.png" alt="" />
                </a>
                <ul className="nav" id="nav">
                  <li>
                    {/* <a href="shop.html">Shop</a> */}
                    <Link to={'/shop'}>Shop</Link>
                  </li>
                  {/* <li>
                    <a href="team.html">Team</a>
                  </li>
                  <li>
                    <a href="experiance.html">Events</a>
                  </li>
                  <li>
                    <a href="shop.html">Company</a>
                  </li> */}
                  <li>
                    <Link to="/orders">Your Orders</Link>
                  </li>
                  <li>
                    <Link to="/profile/99">Your Profile</Link>
                  </li>
                  <li style={{position:"relative"}}>
                    <Link to="/wishList">Your Wishlist</Link>
                    <p
                    style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      lineHeight: '20px',
                      color: 'white',
                      background: 'red',
                      borderRadius: '50%',
                      textAlign: 'center',
                      fontWeight: '600',
                      top: '-5px',
                      right: '0',
                      zIndex: '9',
                      fontSize: '12px'
                    }}
                  >
                    {0}
                  </p>
                  </li>
                  <div className="clear" />
                </ul>
              </div>
              <div className="clear" />
            </div>
            <div className="header_right">
              {/* start search*/}
              <div className="search-box">
                <div id="sb-search" className="sb-search">
                  <form>
                    <input
                      className="sb-search-input"
                      placeholder="Enter your search term..."
                      type="search"
                      name="search"
                      id="search"
                    />
                    <input className="sb-search-submit" type="submit" defaultValue />
                    <span className="sb-icon-search"> </span>
                  </form>
                </div>
              </div>
              {/*--search-scripts--*/}
              {/*--//search-scripts--*/}
              <ul className="icon1 sub-icon1 profile_img" style={{ position: 'relative' }}>
                <li>
                  <Link to={'/cart'}>
                    <p className="active-icon c1"> </p>
                  </Link>
                  <p
                    style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      lineHeight: '20px',
                      color: 'white',
                      background: 'red',
                      borderRadius: '50%',
                      textAlign: 'center',
                      fontWeight: '600',
                      top: '-5px',
                      left: '-10px',
                      zIndex: '9',
                      fontSize: '12px'
                    }}
                  >
                    {cartContext.state.itemCarts.length}
                  </p>
                  <ul className="sub-icon1 list" style={{paddingRight:"10px"}}>
                    {/* <div className="product_control_buttons">
                        <a href="#">
                          <img src="images/edit.png" alt="" />
                        </a>
                        <a href="#">
                          <img src="images/close_edit.png" alt="" />
                        </a>
                      </div> */}
                    <div className="clear" />
                    
                    {cartContext.state.itemCarts.length>0 && cartContext.state.itemCarts.map(item=>{
                      return <>
                       <div className="list_img" style={{display:'flex'}} key={item.id}>
                          <div width={"20%"}>
                            <img src={item.image} alt="" style={{width:"50px",height:"50px"}}/>

                          </div>
                          <div style={{display:'flex',flexDirection:'column',width:"80%",justifyContent:"space-between"}}>
                              <p href="#" style={{fontSize:"12px",fontWeight:"600"}}>{item.name}</p>
                              <span className="actual" style={{fontSize:"12px",fontWeight:"700"}}>{item.quantity} x ${item.price}</span>
                          </div>
                      </div>
                     </>
                    })}
                    <div className="login_buttons" style={{display:'flex',justifyContent:'space-between',width:"100%",marginTop:"0px"}}>
                      <div className="check_button">
                        <Link to="/cart">Go To Cart</Link>
                      </div>
                      <div className="check_button">
                        <a onClick={()=>userContext.logout()}>Logout</a>
                      </div>
                      <div className="clear" />
                    </div>
                    <div className="clear" />
                  </ul>
                </li>
              </ul>

              <div className="clear" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

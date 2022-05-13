import { Box, Button, Container, Rating, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from 'src/components/home/Header';
import { productController } from 'src/controllers/ProductController';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Detail.css';
import BasicTabsProduct from 'src/components/product/TabPanelProduct';
import {CartContext} from '../contexts/CartContext'

export default function DetailPage() {
  const [state, setState] = useState({ product: '' });
  const [value, setValue] = React.useState(1);
  const [star,setStar]= useState(5)
  const { id } = useParams();

  const cartContext = useContext(CartContext)

  useEffect(() => {
    const loadProductLine = () => {
      if (id) {
        productController.getProduct(id).then((res) => {
          setState({ ...state, product: res });
        });
      }
    };
    loadProductLine();
  }, []);

  const onCLickPlus=()=>{
    let newValue = value+1
    setValue(newValue)
  }

  const onCLickMinus=()=>{
    if(value>1){
      let newValue = value-1
      setValue(newValue)
    }
  }

  const addCart =()=>{
    let product=state.product;
    product.quantity=value;
    cartContext.addToCart(product)
  }


  return (
    <div>
      <Header />
      {state.product !== '' ? (
        <Container sx={{ pt: '30px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ pt: '30px', display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
              <Carousel showStatus={false}>
                {arr.map((item) => {
                  return (
                    <div key={item}>
                      <img src={state.product.image} />
                    </div>
                  );
                })}
              </Carousel>
            </Box>
            <Box sx={{ width: '50%', padding: '0 25px' }}>
              <h2 style={{ textAlign: 'center', fontWeight: '700' }}>Product Detail</h2>
              <h3 style={{ marginTop: '50px', fontWeight: '600' }}>Name: {state.product.name}</h3>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                  m: '15px 0'
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={star}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              {/* <h4 style={{marginTop:"20px",marginBottom:"20px",display:'flex',alignItems:"center"}}>
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiOutlineStar/>
                 ( 2 Customer Reviewer)
              </h4> */}
              <h3 style={{ fontWeight: '500' }}>Category: {state.product.category}</h3>
              <p style={{ marginTop: '20px' }}>
                Sumptuous, filling, and temptingly healthy, our Biona Organic Granola with Wild
                Berries is just the thing to get you out of bed. The goodness of rolled wholegrain
                oats are combined with a variety of tangy organic berries, and baked into crispy
                clusters that are as nutritious.
              </p>

              <h2 style={{ marginTop: '20px' }}>
                Price:{' '}
                <span
                  style={{ textDecoration: 'line-through', color: '#CFC4C4', fontSize: '18px' }}
                >
                  $999
                </span>{' '}
                ${state.product.price}
              </h2>

              <div class="quantity1" style={{marginTop:"25px"}}>
                <a  class="quantity__minus" onClick={onCLickMinus}><span>-</span></a>
                <input name="quantity1" type="text" class="quantity__input" value={value} />
                <a class="quantity__plus" onClick={onCLickPlus}><span>+</span></a>
              </div>

              <Button variant='contained' sx={{mt:"20px"}} onClick={addCart}>+ Add To Cart</Button>

            </Box>
          </Box>
          <Box>
            <BasicTabsProduct />
          </Box>
        </Container>
      ) : (
        <Container></Container>
      )}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul className="footer_box">
                <h4>Products</h4>
                <li>
                  <a href="#">Mens</a>
                </li>
                <li>
                  <a href="#">Womens</a>
                </li>
                <li>
                  <a href="#">Youth</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="footer_box">
                <h4>About</h4>
                <li>
                  <a href="#">Careers and internships</a>
                </li>
                <li>
                  <a href="#">Sponserships</a>
                </li>
                <li>
                  <a href="#">team</a>
                </li>
                <li>
                  <a href="#">Catalog Request/Download</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="footer_box">
                <h4>Customer Support</h4>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Shipping and Order Tracking</a>
                </li>
                <li>
                  <a href="#">Easy Returns</a>
                </li>
                <li>
                  <a href="#">Warranty</a>
                </li>
                <li>
                  <a href="#">Replacement Binding Parts</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="footer_box">
                <h4>Newsletter</h4>
                <div className="footer_search">
                  <form>
                    <input
                      type="text"
                      defaultValue="Enter your email"
                      onfocus="this.value = '';"
                      onblur="if (this.value == '') {this.value = 'Enter your email';}"
                    />
                    <input type="submit" defaultValue="Go" />
                  </form>
                </div>
                <ul className="social">
                  <li className="facebook">
                    <a href="#">
                      <span> </span>
                    </a>
                  </li>
                  <li className="twitter">
                    <a href="#">
                      <span> </span>
                    </a>
                  </li>
                  <li className="instagram">
                    <a href="#">
                      <span> </span>
                    </a>
                  </li>
                  <li className="pinterest">
                    <a href="#">
                      <span> </span>
                    </a>
                  </li>
                  <li className="youtube">
                    <a href="#">
                      <span> </span>
                    </a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="row footer_bottom">
            <div className="copy">
              <p>
                © 2014 Template by{' '}
                <a href="http://w3layouts.com" target="_blank">
                  w3layouts
                </a>
              </p>
            </div>
            <dl id="sample" className="dropdown">
              <dt>
                <a href="#">
                  <span>Change Region</span>
                </a>
              </dt>
              <dd>
                <ul>
                  <li>
                    <a href="#">
                      Australia
                      <img className="flag" src="images/as.png" alt="" />
                      <span className="value">AS</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Sri Lanka
                      <img className="flag" src="images/srl.png" alt="" />
                      <span className="value">SL</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Newziland
                      <img className="flag" src="images/nz.png" alt="" />
                      <span className="value">NZ</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Pakistan
                      <img className="flag" src="images/pk.png" alt="" />
                      <span className="value">Pk</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      United Kingdom
                      <img className="flag" src="images/uk.png" alt="" />
                      <span className="value">UK</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      United States
                      <img className="flag" src="images/us.png" alt="" />
                      <span className="value">US</span>
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

const arr = [1, 2, 3, 4];

import React from 'react';

export default function ShopPage() {
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header-left">
                <div className="logo">
                  <a href="index.html">
                    <img src="images/logo.png" alt="" />
                  </a>
                </div>
                <div className="menu">
                  <a className="toggleMenu" href="#">
                    <img src="images/nav.png" alt="" />
                  </a>
                  <ul className="nav" id="nav">
                    <li className="current">
                      <a href="shop.html">Shop</a>
                    </li>
                    <li>
                      <a href="team.html">Team</a>
                    </li>
                    <li>
                      <a href="experiance.html">Events</a>
                    </li>
                    <li>
                      <a href="experiance.html">Experiance</a>
                    </li>
                    <li>
                      <a href="shop.html">Company</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
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
                <ul className="icon1 sub-icon1 profile_img">
                  <li>
                    <a className="active-icon c1" href="#">
                      {' '}
                    </a>
                    <ul className="sub-icon1 list">
                      <div className="product_control_buttons">
                        <a href="#">
                          <img src="images/edit.png" alt="" />
                        </a>
                        <a href="#">
                          <img src="images/close_edit.png" alt="" />
                        </a>
                      </div>
                      <div className="clear" />
                      <li className="list_img">
                        <img src="images/1.jpg" alt="" />
                      </li>
                      <li className="list_desc">
                        <h4>
                          <a href="#">velit esse molestie</a>
                        </h4>
                        <span className="actual">1 x $12.00</span>
                      </li>
                      <div className="login_buttons">
                        <div className="check_button">
                          <a href="checkout.html">Check out</a>
                        </div>
                        <div className="login_button">
                          <a href="login.html">Login</a>
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
      <div className="main">
        <div className="shop_top">
          <div className="container">
            <div className="row shop_box-top">
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic5.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                  <span className="sale-box">
                    <span className="sale-label">Sale!</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="reducedfrom">$66.00</span>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic6.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic7.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                  <span className="sale-box">
                    <span className="sale-label">Sale!</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="reducedfrom">$66.00</span>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic8.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="reducedfrom">$66.00</span>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic9.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic10.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                  <span className="sale-box">
                    <span className="sale-label">Sale!</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic11.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="reducedfrom">$66.00</span>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 shop_box">
                <a href="single.html">
                  <img src="images/pic12.jpg" className="img-responsive" alt="" />
                  <span className="new-box">
                    <span className="new-label">New</span>
                  </span>
                  <span className="sale-box">
                    <span className="sale-label">Sale!</span>
                  </span>
                </a>
                <div className="shop_desc">
                  <a href="single.html"></a>
                  <h3>
                    <a href="single.html" />
                    <a href="#">aliquam volutp</a>
                  </h3>
                  <p>Lorem ipsum consectetuer adipiscing </p>
                  <span className="reducedfrom">$66.00</span>
                  <span className="actual">$12.00</span>
                  <br />
                  <ul className="buttons">
                    <li className="cart">
                      <a href="#">Add To Cart</a>
                    </li>
                    <li className="shop_btn">
                      <a href="#">Read More</a>
                    </li>
                    <div className="clear"> </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

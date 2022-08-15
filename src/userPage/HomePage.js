import { Container, IconButton, InputBase, Paper, Stack } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'src/components/home/Header';
import { UserContext } from 'src/contexts/UserContext';
import { categoryLab6Controller } from 'src/controllers/CategoryLab6Controller ';
import { productController } from 'src/controllers/ProductController';
import { setCookie } from 'src/helper/Cookies';
import { ProductCartWidget, ProductFilterSidebar, ProductSort } from 'src/sections/@dashboard/products';
import SearchIcon from '@mui/icons-material/Search';
import ReactPaginate from 'react-paginate';
import ProductListUser from 'src/components/product/ProductListUser';

export default function HomePage() {

  const navigate = useNavigate();
  const userContext = useContext(UserContext)
  const [openFilter, setOpenFilter] = useState(false);
  const [state,setState] = useState({products:[],categories:[],
    product:{
      id:"",
      name:"",
      category:1,
      description:"",
      price:0,
      image:""
    },
    pagination:{
      page:1,
      perPage:8,
      category:"",
      sort:"",
      by:"",
      search:""
    },
    totalPage:1,
    search:""
  })

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  useEffect(()=>{
    categoryLab6Controller.list().then(resc=>{
      setState(prev=>({...prev,categories:resc}))
    })
  },[])

  useEffect(()=>{
    productController.listWithPagination(state.pagination).then(res=>{
      setState(prev=>({...prev,products:res.listProduct,totalPage:res.totalPage}))
    })
  },[state.pagination])

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const changePage = ({ selected }) => {
    setState(prev=>({...prev,pagination:{...state.pagination,page:selected+1}}))
  }

  const changeCategory=(category)=>{
    // console.log(category);
    setState(prev=>({...prev,pagination:{...prev.pagination,category:category}}))
  }

  const sortProduct=(sort)=>{
    if(sort==="price"){
      setState(prev=>({...prev,pagination:{...prev.pagination,sort:"price",by:"desc"}}))
    }else if(sort==="priceAsc"){
      setState(prev=>({...prev,pagination:{...prev.pagination,sort:"price",by:"asc"}}))
    }else{
      setState(prev=>({...prev,pagination:{...prev.pagination,sort:"",by:""}}))
    }
  }

  return (
    <div>
      <Header />
      <div className="main">
        <div className="content-top">
          <h2>snowboards</h2>
          <p>hendrerit in vulputate velit esse molestie consequat, vel illum dolore</p>
          <div className="close_but">
            <i className="close1"> </i>
          </div>
          <ul id="flexiselDemo3">
            <li>
              <img src="images/board1.jpg" />
            </li>
            <li>
              <img src="images/board2.jpg" />
            </li>
            <li>
              <img src="images/board3.jpg" />
            </li>
            <li>
              <img src="images/board4.jpg" />
            </li>
            <li>
              <img src="images/board5.jpg" />
            </li>
          </ul>
          <h3>SnowBoard Extreme Series</h3>
        </div>
      </div>
      <div className="content-bottom">
        <div className="container">
          <div className="row content_bottom-text">
            <div className="col-md-7">
              <h3>
                The Mountains
                <br />
                Snowboarding
              </h3>
              <p className="m_1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
                vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
                at vero eros et accumsan et iusto odio.
              </p>
              <p className="m_2">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
                vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
                at vero eros et accumsan et iusto odio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container sx={{mt:"20px"}}>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        > 
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              changeCategory={changeCategory}
            />
            <ProductSort sortProduct={sortProduct}/>
          </Stack>
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300,border:"1px solid #ddd" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={e=>setState(prev=>({...prev,search:e.target.value}))}
            />
            <IconButton  sx={{ p: '10px' }} aria-label="search">
              <SearchIcon onClick={()=>setState(prev=>({...prev,pagination:{...prev.pagination,search:state.search}}))}/>
            </IconButton>
          </Paper>
        </Stack>

        <ProductListUser products={state.products}/>
        <ProductCartWidget />
      </Container>
        {state.products.length>0? <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              pageCount={state.totalPage}
              onPageChange={changePage}
              containerClassName='paginationBtn'
              previousClassName='previousBtn'
              nextLinkClassName='nextBtn'
              disabledClassName='paginationDisable'
              activeClassName='paginationActive'
            />: ""}


      <div className="features">
        <div className="container">
          <h3 className="m_3">Features</h3>
          <div className="close_but">
            <i className="close1"> </i>
          </div>
          <div className="row">
            <div className="col-md-3 top_box">
              <div className="view view-ninth">
                <a href="single.html">
                  <img src="images/pic1.jpg" className="img-responsive" alt="" />
                  <div className="mask mask-1"> </div>
                  <div className="mask mask-2"> </div>
                  <div className="content">
                    <h2>Hover Style #9</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                  </div>
                </a>{' '}
              </div>
              <h4 className="m_4">
                <a href="#">nostrud exerci ullamcorper</a>
              </h4>
              <p className="m_5">claritatem insitam</p>
            </div>
            <div className="col-md-3 top_box">
              <div className="view view-ninth">
                <a href="single.html">
                  <img src="images/pic2.jpg" className="img-responsive" alt="" />
                  <div className="mask mask-1"> </div>
                  <div className="mask mask-2"> </div>
                  <div className="content">
                    <h2>Hover Style #9</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                  </div>
                </a>{' '}
              </div>
              <h4 className="m_4">
                <a href="#">nostrud exerci ullamcorper</a>
              </h4>
              <p className="m_5">claritatem insitam</p>
            </div>
            <div className="col-md-3 top_box">
              <div className="view view-ninth">
                <a href="single.html">
                  <img src="images/pic3.jpg" className="img-responsive" alt="" />
                  <div className="mask mask-1"> </div>
                  <div className="mask mask-2"> </div>
                  <div className="content">
                    <h2>Hover Style #9</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                  </div>
                </a>{' '}
              </div>
              <h4 className="m_4">
                <a href="#">nostrud exerci ullamcorper</a>
              </h4>
              <p className="m_5">claritatem insitam</p>
            </div>
            <div className="col-md-3 top_box1">
              <div className="view view-ninth">
                <a href="single.html">
                  <img src="images/pic4.jpg" className="img-responsive" alt="" />
                  <div className="mask mask-1"> </div>
                  <div className="mask mask-2"> </div>
                  <div className="content">
                    <h2>Hover Style #9</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                  </div>
                </a>{' '}
              </div>
              <h4 className="m_4">
                <a href="#">nostrud exerci ullamcorper</a>
              </h4>
              <p className="m_5">claritatem insitam</p>
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

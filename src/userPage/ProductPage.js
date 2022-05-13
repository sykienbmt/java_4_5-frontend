
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// material
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Pagination, Select, Stack, TextField, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import { productController } from 'src/controllers/ProductController';
import Iconify from 'src/components/Iconify';
import { categoryController } from 'src/controllers/CategoryController';
import Header from '../components/home/Header'
import ProductListUser from 'src/components/product/ProductListUser';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ReactPaginate from 'react-paginate';
import Footer from 'src/components/home/Footer';

// ----------------------------------------------------------------------

export default function ProductPage() {
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
    categoryController.list().then(resc=>{
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
    <Page title="Shop">
      <Header />
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
      <Footer />
    </Page>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2
};
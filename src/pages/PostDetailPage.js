import { Box, Button, Container, Rating, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from 'src/components/home/Header';
import { productController } from 'src/controllers/ProductController';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Detail.css';
import {CartContext} from '../contexts/CartContext'
import { postController } from 'src/controllers/PostController';
import BasicTabsProduct from 'src/components/product/TabPanelProduct';
import { categoryLab6Controller } from 'src/controllers/CategoryLab6Controller ';

export default function PostDetailPage() {
  const [state, setState] = useState({ post: '' ,category:[]});
  const [value, setValue] = React.useState(1);
  const [star,setStar]= useState(5)
  const { id } = useParams();

  useEffect(() => {

    const loadProductLine = () => {
      if (id) {
        postController.getById(id).then((res) => {
          categoryLab6Controller.list().then(res1=>{
            setState({ ...state, post: res ,category:res1});
          })
        });
      }
    };
    loadProductLine();
  }, []);

  const getCategory=()=>{
    let index=state.category.findIndex(item=>item.categoryId==state.post.categoryId)
                return state.category[index].nameCategory
  }

  return (
    <div>
      {state.post !== '' ? (
        <Container sx={{ pt: '30px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ pt: '30px', display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
              <Carousel showStatus={false}>
                {arr.map((item) => {
                  return (
                    <div key={item}>
                      <img src={state.post.image} />
                    </div>
                  );
                })}
              </Carousel>
            </Box>
            <Box sx={{ width: '50%', padding: '0 25px' }}>
              <h2 style={{ textAlign: 'center', fontWeight: '700' }}>Post Detail</h2>
              <h3 style={{ marginTop: '50px', fontWeight: '600' }}>Name: {state.post.name}</h3>
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

              <h3 style={{ fontWeight: '500' }}>Category: {getCategory()}</h3>
              <p style={{ marginTop: '20px' }}>
                {state.post.description}
              </p>

            </Box>
          </Box>
          <Box>
            <BasicTabsProduct />
          </Box>
        </Container>
      ) : (
        <Container></Container>
      )}
    </div>
  );
}

const arr = [1, 2, 3, 4];

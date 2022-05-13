import { Box, Button, Pagination } from '@mui/material';
import { useDeprecatedAnimatedState } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Header from 'src/components/home/Header';
import { orderController } from 'src/controllers/OrderController';
import { UserContext } from '../../contexts/UserContext';
import ItemOrderList from './ItemOrderList';

import './OrderPage.css';
const { v4: uuid } = require('uuid');

export default function OrderPage() {
  const userContext = useContext(UserContext);

  const [state, setState] = useState({
    listOrder: [],
    page: 1,
    totalPage: 1,
    perPage: 5
  });

  useEffect(() => {
    if (userContext.state.userInfo.id !== '') {
      orderController.getOrders(userContext.state.userInfo.id).then((res) => {
        setState({ ...state, listOrder: res });
      });
    }
  }, [userContext.state.userInfo.id]);

  const changePage = ({ selected }) => {
    setState({ ...state, page: selected + 1 });
  };

  return (
    <section id="order-history-container">
      <Header />
      <div className="order-history">
        <h2 className="order-history-title">Order History</h2>
        {state.listOrder.length > 0 ? (
          state.listOrder.map((item) => <ItemOrderList key={uuid()} itemOrder={item} />)
        ) : (
          <div className="order-null">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img
                src="https://www.svgrepo.com/show/301679/choices-order.svg"
                style={{ width: '250px', margin: 'auto' }}
                alt=""
              />
            </div>
            <h3>You do not have any orders yet</h3>
            <h3>Please back to shop and buy something</h3>
            <Link to={'/shop'}>
              <Button id="button-order-null">Back to Shop</Button>
            </Link>
          </div>
        )}
      </div>
      {state.listOrder.length > 0 ? (
        <Box spacing={2} sx={{ width: '100%', textAlight: 'center', mt: '20px' }}>
          <Pagination
            count={1}
            variant="outlined"
            shape="rounded"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      ) : (
        ''
      )}

      {/* {state.listOrder.length>0? <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
            //   pageCount={state.totalPage}
            //   onPageChange={changePage}
              containerClassName='paginationBtn'
              previousClassName='previousBtn'
              nextLinkClassName='nextBtn'
              disabledClassName='paginationDisable'
              activeClassName='paginationActive'
            />: ""} */}
    </section>
  );
}

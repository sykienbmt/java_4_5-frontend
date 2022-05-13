import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
// material
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import { productController } from 'src/controllers/ProductController';
import Iconify from 'src/components/Iconify';
import { categoryController } from 'src/controllers/CategoryController';
import { UserContext } from 'src/contexts/UserContext';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [state, setState] = useState({
    products: [],
    categories: [],
    idDelete: '',
    err: '',
    product: {
      id: '',
      name: '',
      category: 1,
      description: '',
      price: 0,
      image: ''
    }
  });

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

  useEffect(() => {
    productController.list().then((res) => {
      categoryController.list().then((resc) => {
        setState((prev) => ({ ...prev, products: res, categories: resc }));
      });
    });
  }, []);

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setState((prev) => ({ ...prev, err: '' }));
  };

  const handleChange = (event) => {
    setState((prev) => ({ ...prev, product: { ...prev.product, category: event.target.value } }));
  };

  const { setMess } = useContext(UserContext);

  const addProduct = (e) => {
    e.preventDefault();
    if (
      state.product.image == '' ||
      state.product.category == '' ||
      state.product.name == '' ||
      state.product.price == 0
    ) {
      setState((prev) => ({ ...prev, err: 'Pls refill all fields' }));
    } else {
      let product = { ...state.product };
      product.id = 0;
      product.deleteAt = null;
      productController.add(product).then((res) => {
        setState((prev) => ({ ...prev, products: res, err: '' }));
      });
      setMess('Add Done');
    }
  };

  const editProduct = (product) => {
    let index = state.categories.findIndex((i) => i.nameCategory == product.category);
    let productEdit = product;
    productEdit.category = state.categories[index].id;
    setState((prev) => ({ ...prev, product: productEdit }));
    handleOpen();
  };

  const deleteProduct = (id) => {
    handleClickOpen1();
    setState((prev) => ({ ...prev, idDelete: id }));
  };

  const edit = (e) => {
    e.preventDefault();
    let productEdit = state.product;
    productEdit.deleteAt = null;
    productController.edit(productEdit).then((res) => {
      setState((prev) => ({ ...prev, products: res }));
    });
    handleClose();
    setMess('Edit Done');
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const onClickDelete1 = () => {
    handleClose1();
    productController.delete(state.idDelete).then((res) => {
      setState((prev) => ({ ...prev, products: res }));
    });
    setMess('Delete Done');
  };

  const onSubmit1=(e)=>{
    e.preventDefault();
    console.log(123);
  }

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
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
            />
            <ProductSort />
          </Stack>
          <Button
            variant="contained"
            // component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New Product
          </Button>
        </Stack>

        <ProductList
          products={state.products}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />
        <ProductCartWidget />
        <Box spacing={2} sx={{ width: '100%', textAlight: 'center', mt: '20px' }}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={state.product.id == '' ? (e) => addProduct(e) : (e) => edit(e)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {state.product.id == '' ? 'New Product' : 'Edit Product'}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="Product name"
              required
              defaultValue={state.product.name}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  product: { ...prev.product, name: e.target.value }
                }))
              }
            />

            <TextField
              fullWidth
              type="text"
              label="Price"
              required
              defaultValue={state.product.price}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  product: { ...prev.product, price: e.target.value }
                }))
              }
            />
            <FormControl fullWidth sx={{ mt: '10px', mb: '4px' }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.product.category}
                label="Category"
                onChange={handleChange}
              >
                {state.categories.length > 0 &&
                  state.categories.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameCategory}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="text"
              label="Image"
              required
              defaultValue={state.product.image}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  product: { ...prev.product, image: e.target.value }
                }))
              }
            />
            <TextField
              fullWidth
              type="text"
              label="Description"
              multiline
              required
              sx={{ marginTop: '10px', marginBottom: '15px' }}
              rows={4}
              defaultValue={state.product.description}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  product: { ...prev.product, description: e.target.value }
                }))
              }
            />
            <p style={{ textAlign: 'center', color: 'red', margin: '10px 0' }}>{state.err}</p>

            <Button
              variant="contained"
              type="submit"
              value="Submit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {state.product.id == '' ? 'Add' : 'Edit'}
            </Button>
          </Box>
        </form>
      </Modal>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this Product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickDelete1}>Yes</Button>
          <Button onClick={handleClose1} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
  borderRadius: 2
};

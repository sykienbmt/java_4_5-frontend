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
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Paper,
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
import Iconify from 'src/components/Iconify';
import { UserContext } from 'src/contexts/UserContext';
import { categoryLab6Controller } from 'src/controllers/CategoryLab6Controller ';
import { postController } from 'src/controllers/PostController';
import PostList from 'src/sections/@dashboard/products/PostList';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

export default function PostLab6() {
  const [openFilter, setOpenFilter] = useState(false);
  const [search,setSearch]=useState("")
  const [state, setState] = useState({
    posts: [],
    categories6: [],
    idDelete: '',
    err: '',
    errImage: '',
    errDesc: '',
    errName: '',
    post: {
      postId: '',
      name: '',
      categoryId: 1,
      description: '',
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
    postController.list().then((res) => {
      categoryLab6Controller.list().then((resc) => {
        setState((prev) => ({ ...prev, posts: res, categories6: resc }));
      });
    });
  }, []);

  const handleSearch=()=>{
    if(search==""){
      postController.list().then(res=>{
        setState(prev=>({...prev,posts: res}))
      })
    }else{
      postController.list();
      setState(prev=>({...prev,posts: state.posts.filter(item=>item.name.includes(search))}))
    }
  }

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
    setState((prev) => ({
      ...prev,
      errImage: '',
      errDesc: '',
      errName: '',
      post: {
        postId: '',
        name: '',
        categoryId: 1,
        description: '',
        image: ''
      }
    }));
  };

  const handleChange = (event) => {
    setState((prev) => ({ ...prev, post: { ...prev.post, categoryId: event.target.value } }));
  };

  const { setMess } = useContext(UserContext);

  const addProduct = (e) => {
    let isValid = false;
    e.preventDefault();
    if (state.post.image == '') {
      setState((prev) => ({ ...prev, errImage: 'Image is Required' }));
      isValid = true;
    }
    if (state.post.name == '') {
      setState((prev) => ({ ...prev, errName: 'Name is Required' }));
      isValid = true;
    }
    if (state.post.description == '') {
      setState((prev) => ({ ...prev, errDesc: 'Description is Required' }));
      isValid = true;
    }

    if (!isValid) {
      let post = { ...state.post };
      post.postId = 0;
      post.deleteAt = null;
      postController.create(post).then((res) => {
        postController.list().then((res) => {
          setState((prev) => ({ ...prev, posts: res}));
        })
      });
      handleClose()
      setMess('Add Done');
    }
  };

  const editProduct = (post1) => {
    console.log(123);
    // let index = state.categories6.findIndex((i) => i.id == post.categoryId);
    // let productEdit = post;
    // productEdit.categoryId = state.categories6[index].categoryId;
    setState((prev) => ({ ...prev, post: post1 }));
    handleOpen();
  };

  const deleteProduct = (id) => {
    handleClickOpen1();
    setState((prev) => ({ ...prev, idDelete: id }));
  };

  const edit = (e) => {
    e.preventDefault();
    let productEdit = state.post;
    productEdit.deleteAt = null;
    postController.edit(productEdit).then((res) => {
      postController.list().then((res) => {
        setState((prev) => ({ ...prev, posts: res}));
      })
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
    postController.delete(state.idDelete).then((res) => {
      postController.list().then((res) => {
        setState((prev) => ({ ...prev, posts: res}));
      })
    });
    setMess('Delete Done');
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
      <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300,border:"1px solid #ddd" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search post"
              onChange={e=>setSearch(e.target.value)}
            />
            <IconButton  sx={{ p: '10px' }} aria-label="search">
              <SearchIcon onClick={()=>handleSearch()}/>
            </IconButton>
          </Paper>
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
            New Post
          </Button>
        </Stack>

        <PostList
          posts={state.posts}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />
        <ProductCartWidget />
        <Box spacing={2} sx={{ width: '100%', textAlight: 'center', mt: '20px' }}>
          <Pagination
            count={1}
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
        <form onSubmit={state.post.postId == '' ? (e) => addProduct(e) : (e) => edit(e)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {state.post.postId == '' ? 'New Post' : 'Edit Post'}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="Post name"
              // required
              defaultValue={state.post.name}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  post: { ...prev.post, name: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errName}
            </Typography>

            <FormControl fullWidth sx={{ mt: '10px', mb: '4px' }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.post.categoryId}
                label="Category"
                onChange={handleChange}
              >
                {state.categories6.length > 0 &&
                  state.categories6.map((item) => {
                    return (<MenuItem key={item.categoryId} value={item.categoryId}>
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
              // required
              defaultValue={state.post.image}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  post: { ...prev.post, image: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errImage}
            </Typography>
            <TextField
              fullWidth
              type="text"
              label="Description"
              multiline
              // required
              sx={{ marginTop: '10px', marginBottom: '15px' }}
              rows={4}
              defaultValue={state.post.description}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  post: { ...prev.post, description: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errDesc}
            </Typography>

            <Button
              variant="contained"
              type="submit"
              value="Submit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {state.post.postId == '' ? 'Add' : 'Edit'}
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
            Are you sure to delete this Post ?
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

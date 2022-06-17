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
import Iconify from 'src/components/Iconify';
import { UserContext } from 'src/contexts/UserContext';
import { userController } from 'src/controllers/UserController';
import { UserListHead } from 'src/sections/@dashboard/user';

// ----------------------------------------------------------------------

export default function UserManager() {
  console.log(123);
  const [openFilter, setOpenFilter] = useState(false);
  const [state, setState] = useState({
    users: [],
    userInfo: {
      id: '',
      username: '',
      name: '',
      password: '',
      role: 2,
      email: '',
      phone: '',
      address: ''
    },
    errUsername: '',
    errName: '',
    errPassword: '',
    errEmail: '',
    errPhone: '',
    errAddress: '',
    idDelete: ''
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      password: '',
      role: '',
      email: '',
      phone: '',
      address: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  useEffect(() => {
    userController.list().then((res) => {
      setState((prev) => ({ ...prev, products: res }));
    });
  }, []);

  console.log(state);

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
      errCategory: '',
      errImage: '',
      errName: '',
      errPrice: '',
      userInfo: {
        id: '',
        username: '',
        name: '',
        password: '',
        role: 2,
        email: '',
        phone: '',
        address: ''
      }
    }));
  };

  const handleChange = (event) => {
    setState((prev) => ({ ...prev, product: { ...prev.product, role: event.target.value } }));
  };

  const { setMess } = useContext(UserContext);

  const addUser = (e) => {
    let isValid = false;
    e.preventDefault();
    if (state.userInfo.username == '') {
      setState((prev) => ({ ...prev, errUsername: 'Username is Required' }));
      isValid = true;
    }
    if (state.userInfo.password == '') {
      setState((prev) => ({ ...prev, errPassword: 'Password is Required' }));
      isValid = true;
    }
    if (state.userInfo.name == '') {
      setState((prev) => ({ ...prev, errName: 'Name is Required' }));
      isValid = true;
    }
    if (state.userInfo.email == '') {
      setState((prev) => ({ ...prev, errEmail: 'Email is Required' }));
      isValid = true;
    }
    if (state.userInfo.Phone == '') {
      setState((prev) => ({ ...prev, errPhone: 'Phone is Required' }));
      isValid = true;
    }
    if (state.userInfo.address == '') {
      setState((prev) => ({ ...prev, errAddress: 'Email is Required' }));
      isValid = true;
    }

    if (!isValid) {
      let userInfo = { ...state.userInfo };
      userInfo.id = 0;
      userInfo.deleteAt = null;
      userController.add(userInfo).then((res) => {
        setState((prev) => ({ ...prev, users: res }));
      });
      setState((prev) => ({
        ...prev,
        userInfo: {
          id: '',
          username: '',
          name: '',
          password: '',
          role: 2,
          email: '',
          phone: '',
          address: ''
        },
        errUsername: '',
        errName: '',
        errPassword: '',
        errEmail: '',
        errPhone: '',
        errAddress: ''
      }));
      setMess('Add Done');
    }
  };

  const editUser = (userInfo) => {
    let index = roles.findIndex((i) => i.id == userInfo.id);
    let userInfoEdit = userInfo;
    userInfoEdit.role = roles[index].role;
    setState((prev) => ({ ...prev, userInfo: userInfoEdit }));
    handleOpen();
  };

  const deleteUser = (id) => {
    handleClickOpen1();
    setState((prev) => ({ ...prev, idDelete: id }));
  };

  const edit = (e) => {
    e.preventDefault();
    let userEdit = state.userInfo;
    userEdit.deleteAt = null;
    userController.edit(userEdit).then((res) => {
      setState((prev) => ({ ...prev, users: res }));
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
    userController.delete(state.idDelete).then((res) => {
      setState((prev) => ({ ...prev, users: res }));
    });
    setMess('Delete Done');
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <Page title="Dashboard: Users | Minimal-UI">
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
            New User
          </Button>
        </Stack>

            {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
          {/* </Table>
        </TableContainer> */}

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
        <form onSubmit={state.userInfo.id == '' ? (e) => addUser(e) : (e) => edit(e)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {state.userInfo.id == '' ? 'New User' : 'Edit User'}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="username"
              // required
              defaultValue={state.userInfo.username}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, username: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errUsername}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="password"
              // required
              defaultValue={state.userInfo.password}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, password: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errPassword}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="Name"
              // required
              defaultValue={state.userInfo.name}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, name: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errName}
            </Typography>

            <FormControl fullWidth sx={{ mt: '10px', mb: '4px' }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.userInfo.role}
                label="Role"
                onChange={handleChange}
              >
                {roles.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.role}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="text"
              label="Email"
              // required
              defaultValue={state.userInfo.email}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, email: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {state.errEmail}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="Phone number"
              multiline
              // required
              sx={{ marginTop: '10px', marginBottom: '15px' }}
              rows={4}
              defaultValue={state.userInfo.phone}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, phone: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {state.errPhone}
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="Address"
              multiline
              // required
              sx={{ marginTop: '10px', marginBottom: '15px' }}
              rows={4}
              defaultValue={state.userInfo.address}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, address: e.target.value }
                }))
              }
            />
            <Typography sx={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {state.errAddress}
            </Typography>

            <Button
              variant="contained"
              type="submit"
              value="Submit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {state.userInfo.id == '' ? 'Add' : 'Edit'}
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
            Are you sure to delete this User ?
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

const roles = [
  {
    id: 1,
    role: 'admin'
  },
  {
    id: 2,
    role: 'user'
  }
];

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

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TextField,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import USERLIST from '../_mocks_/user';
import { categoryController } from 'src/controllers/CategoryController';
import SearchIcon from '@mui/icons-material/Search';
import { userController } from 'src/controllers/UserController';
import { UserContext } from 'src/contexts/UserContext';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'password', label: 'Password', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UsersManager() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [state,setState]= useState({
  //   listCategory:[],errLabel:"",errName:"",errDescription:"",category:{
  //   id:"",
  //   nameCategory:"",
  //   description:""
  // }})
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

  const [search, setSearch] = useState('');

  useEffect(() => {
    userController.list().then((res) => {
      setState((prev) => ({ ...prev, users: res }));
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    userController.list()
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    userController.list()
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = () => {
  //   console.log("search");
  //   categoryController.searchByName(filterName).then(res=>{
  //     console.log(res);
  //   })
  //   // console.log(event.target.value);
  //   // setFilterName(event.target.value);
  // };

  const handleSearch = () => {
    if (search == '') {
      userController.list().then((res) => {
        setState((prev) => ({ ...prev, users: res }));
      });
    } else {
      let list = state.users.filter(item=>item.username.includes(search))
      setState((prev) => ({ ...prev, users: list }));
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

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
    setState((prev) => ({ ...prev, userInfo: { ...prev.userInfo, role: event.target.value } }));
  };


  const addEditCategory = (e) => {
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
      console.log(userInfo);
      userInfo.id = 0;
      userInfo.deleteAt = null;
      userController.create(userInfo).then((res) => {  
        userController.list().then((res) => {
          setState((prev) => ({ ...prev, users: res }));
        });
      });
      handleClose()
      setMess('Add Done');
    }
  };
  const { setMess } = useContext(UserContext);

  const editCategory = (e) => {
    console.log("edit");  
    e.preventDefault();
    let userEdit = state.userInfo;
    console.log(state.userInfo);
    const index = roles.findIndex(i=>i.id==state.userInfo.role)

    userEdit.role=roles[index].role
    userEdit.deleteAt = null;
    userController.edit(userEdit).then((res) => {  
      userController.list().then((res) => {
        setState((prev) => ({ ...prev, users: res }));
      });
    });
    handleClose();
    setMess('Edit Done');
  };

  const setEdit = (userInfo1) => {
    const index = roles.findIndex(i=>i.role===userInfo1.role)
    userInfo1.role=roles[index].id
    setState((prev) => ({ ...prev, userInfo: userInfo1 }));
    handleOpen();
  };

  const deleteCategory = (id) => {
    userController.delete(id).then((res) => {
      userController.list().then((res) => {
        setState((prev) => ({ ...prev, users: res }));
      });
    });
    toast.success('Delete Done', { position: 'bottom-right', autoClose: 3000 });
  };

  return (
    <Page title="Admin | Users">
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 300,
              border: '1px solid #ddd'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search User"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon onClick={() => handleSearch()} />
            </IconButton>
          </Paper>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, p: '10px' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={state.users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {state.users.length > 0 &&
                    state.users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, username, name,password,role,email,phone,address } = row;
                        const isItemSelected = selected.indexOf(username) !== -1;
                        let index = roles.findIndex(i=>i.id==role);

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, username)}
                              />
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                              sx={{ textAlign: 'left', paddingLeft: '15px' }}
                            >
                              {/* <Avatar alt={nameCategory} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{"*******"}</TableCell>
                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phone}</TableCell>
                            <TableCell align="left">{address}</TableCell>

                            <TableCell align="right">
                              <UserMoreMenu
                                category={row}
                                setEdit={setEdit}
                                deleteCategory={deleteCategory}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={state.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={state.userInfo.id == '' ? (e) => {addEditCategory(e)} : (e) => {editCategory(e)}}>
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

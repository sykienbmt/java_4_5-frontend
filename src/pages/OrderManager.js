import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
  TableHead,
  Select,
  MenuItem,
  FormControl,
  InputLabel
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
import { orderController } from 'src/controllers/OrderController';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'full_name', label: 'Full Name', alignRight: false },
  { id: 'phone_number', label: 'Phone Number', alignRight: false },
  { id: 'payment', label: 'Payment', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
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

export default function OrderManager() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderSelect, setOrderSelect] = useState({
    id: '',
    email: '',
    address: '',
    datetime: '',
    full_name: '',
    payment: '',
    phone_number: '',
    status: 1,
    total: 0
  });
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [status, setStatus] = useState(1);
  const [state, setState] = useState({
    listOrder: [],
    listItemOrder: [],
    errLabel: '',
    errName: '',
    errDescription: '',
    category: {
      id: '',
      nameCategory: '',
      description: ''
    }
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    orderController.getAllOrders().then((res) => {
      setState((prev) => ({ ...prev, listOrder: res }));
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const {setErr} = useContext(UserContext)

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    // if(search==""){
    //   categoryController.list().then(res=>{
    //     setState(prev=>({...prev,listOrder:res}))
    //   })
    // }else{
    //   categoryController.searchByName(search).then(res=>{
    //     setState(prev=>({...prev,listOrder:res}))
    //   })
    // }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const [open, setOpen] = useState(false);
  const handleOpen = (order) => {
    let item = { ...order };
    let index = statusList.findIndex((item) => item.status == order.status);
    item.status = statusList[index].id;
    setOrderSelect(item);
    orderController.getAllOrdersByIdOrder(order.id).then((res) => {
      setState({ ...state, listItemOrder: res });
      setOpen(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
    // setState(prev=>({...prev,errLabel:"",category:{
    //   id:"",
    //   nameCategory:"",
    //   description:""
    // }}))
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setOrderSelect({ ...orderSelect, status: event.target.value });
    console.log(orderSelect);
    let index = statusList.findIndex((item) => item.id == event.target.value);
    console.log(index);
    let orderStatus = {
      id: orderSelect.id,
      status: statusList[index].status
    };
    orderController.updateOrderStatus(orderStatus).then((res) => {
      if(res==403){
        setErr('Permisson Denied');
      }else{
        if (res != false) {
          setState((prev) => ({ ...prev, listOrder: res }));
        }
      }
    });
    // setState((prev) => ({ ...prev, Sta: { ...prev.product, category: event.target.value } }));
  };

  return (
    <Page title="Admin | Orders">
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
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
              placeholder="Search Orders"
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
                  rowCount={state.listOrder.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {state.listOrder.length > 0 &&
                    state.listOrder
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          id,
                          email,
                          address,
                          datetime,
                          full_name,
                          payment,
                          phone_number,
                          status,
                          total
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

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
                                onChange={(event) => handleClick(event, id)}
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
                                {id.slice(0, 5).concat('...')}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{full_name}</TableCell>
                            <TableCell align="left">{phone_number}</TableCell>
                            <TableCell align="left">{payment}</TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                color:
                                  status == "pending" ? 'orange' : status == 'success' ? 'green' : 'red'
                              }}
                            >
                              {status}
                            </TableCell>
                            <TableCell align="right">$ {total}</TableCell>

                            <TableCell align="right">
                              {/* <UserMoreMenu category={row} setEdit={()=>{}} deleteCategory={()=>{}}/> */}
                              <Button variant="outlined" onClick={() => handleOpen(row)}>
                                Detail
                              </Button>
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
            count={state.listOrder.length}
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
        <Box sx={style}>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <h4 style={{ lineHeight: '64px' }}>OrderDetail</h4>

            <FormControl sx={{ mt: '10px', mb: '4px', width: '150px' }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderSelect.status}
                label="Status"
                onChange={handleChange}
              >
                {statusList.map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      sx={{
                        textTransform: 'capitalize',
                        color: item.id == 1 ? 'orange' : item.id == 2 ? 'green' : 'red'
                      }}
                    >
                      {item.status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Id</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.listItemOrder.length > 0 &&
                  state.listItemOrder.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">
                        <img
                          src={row.image}
                          alt=""
                          style={{ width: '50px', height: '50px', textAlign: 'center' }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ textAlign: 'right', mt: '15px' }}>Total: {orderSelect.total}$ </Typography>
        </Box>
      </Modal>
    </Page>
  );
}

const statusList = [
  {
    id: 1,
    status: 'pending'
  },
  {
    id: 2,
    status: 'success'
  },
  {
    id: 3,
    status: 'cancel'
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

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
  IconButton
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
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'desctiption', label: 'Desctiption', alignRight: false },
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

export default function Category() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [state,setState]= useState({listCategory:[],errLabel:"",errName:"",errDescription:"",category:{
    id:"",
    nameCategory:"",
    description:""
  }})

  const [search,setSearch]=useState("")


  useEffect(()=>{
    categoryController.list().then(res=>{
      setState(prev=>({...prev,listCategory:res}))
    })
  },[])

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
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

  const handleSearch=()=>{
    if(search==""){
      categoryController.list().then(res=>{
        setState(prev=>({...prev,listCategory:res}))
      })
    }else{
      categoryController.searchByName(search).then(res=>{
        setState(prev=>({...prev,listCategory:res}))
      })
    }
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setState(prev=>({...prev,errLabel:"",category:{
      id:"",
      nameCategory:"",
      description:""
    }}))
  };

  const addEditCategory =()=>{
    if(state.category.nameCategory=="" || state.category.description==""){
      if(state.category.nameCategory==="" ){
        setState(prev=>({...prev,errName:"Name is required"}))
      }
      if(state.category.description==="" ){
        setState(prev=>({...prev,errDescription:"Description is required"}))
      }
      return;
    }else{
      let category={
        nameCategory:state.category.nameCategory,
        description:state.category.description,
        deleteAt:null
      }
      categoryController.create(category).then(res=>{
        if(res==403){
          toast.error("Permission Denied", {  position: 'bottom-right', autoClose: 1500 })
        }else{
          setState(prev=>({...prev,listCategory:res,category:{...prev.category,nameCategory:"",description:"",errLabel:""}}))
          toast.success("Create Done", {  position: 'bottom-right', autoClose: 3000 })
        }
      })
      handleClose()
    }
  }

  const editCategory=()=>{
    if(state.category.nameCategory==="" || state.category.description===""){
      setState(prev=>({...prev,errLabel:"Pls Refill all fields"}))
    }else{
      categoryController.edit(state.category).then(res=>{
        if(res==403){
          toast.error("Permission Denied", {  position: 'bottom-right', autoClose: 1500 })
        }else{

          setState(prev=>({...prev,errLabel:"",listCategory:res,category:{
            id:"",
            nameCategory:"",
            description:""
          }}))
          toast.success("Edit Done", {  position: 'bottom-right', autoClose: 3000 })
        }
      })
      handleClose()
    }
  }

  const setEdit=(category)=>{
    handleOpen()
    setState(prev=>({...prev,category:category}))
  }

  const deleteCategory=(id)=>{
    categoryController.delete(id).then(res=>{
      if(res==403){
        toast.error("Permission Denied", {  position: 'bottom-right', autoClose: 1500 })
      }else{
        setState(prev=>({...prev,listCategory:res}))
        toast.success("Delete Done", {  position: 'bottom-right', autoClose: 3000 })
      }
    })
  }


  return (
    <Page title="Admin | Category">
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New Category
          </Button>
        </Stack>

        <Card>
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300,border:"1px solid #ddd" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search category"
              onChange={e=>setSearch(e.target.value)}
            />
            <IconButton  sx={{ p: '10px' }} aria-label="search">
              <SearchIcon onClick={()=>handleSearch()}/>
            </IconButton>
          </Paper>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800,p:"10px" }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={state.listCategory.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {state.listCategory.length>0 && state.listCategory
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, nameCategory ,description} = row;
                      const isItemSelected = selected.indexOf(nameCategory) !== -1;

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
                              onChange={(event) => handleClick(event, nameCategory)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none" sx={{textAlign:'left',paddingLeft:'15px'}}>
                              {/* <Avatar alt={nameCategory} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                          </TableCell>

                          <TableCell align="left">{nameCategory}</TableCell>
                          <TableCell align="left">{description}</TableCell>

                          <TableCell align="right">
                            <UserMoreMenu category={row} setEdit={setEdit} deleteCategory={deleteCategory}/>
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
            count={state.listCategory.length}
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {state.category.id==""?'New Category':"Edit Category"}
          </Typography>
          <TextField
            fullWidth
            type="text"
            label="Category name"
            defaultValue={state.category.nameCategory}
            sx={{marginTop:"10px"}}
            onChange = {e=>setState(prev=>({...prev,category:{...prev.category,nameCategory:e.target.value}}))}
          />
          <Typography sx={{color:"red",fontSize:"14px",textAlign:"center"}}>{state.errName}</Typography>
          <TextField
            fullWidth
            type="text"
            label="Description"
            multiline
            sx={{marginTop:"10px",marginBottom:"15px"}}
            rows={4}
            defaultValue={state.category.description}
            onChange = {e=>setState(prev=>({...prev,category:{...prev.category,description:e.target.value}}))}
          />
          <Typography sx={{color:"red",fontSize:"14px",textAlign:"center"}}>{state.errDescription}</Typography>
          <Box sx={{textAlign:'right'}}>
            <Button
              variant="contained"
              to="#"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={state.category.id==""?addEditCategory:editCategory}
            >
              {state.category.id==""?'Add':"Edit"}
            </Button>
          </Box>
        </Box>
      </Modal>
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
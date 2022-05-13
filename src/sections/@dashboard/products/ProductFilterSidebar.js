import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
//
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import ColorManyPicker from '../../../components/ColorManyPicker';
import { useEffect, useState } from 'react';
import { categoryController } from 'src/controllers/CategoryController';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
  changeCategory:PropTypes.func
};

export default function ShopFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik,
  changeCategory
}) {
  const { values, getFieldProps, handleChange } = formik;
  const [listCate,setListCate]= useState([])

  useEffect(()=>{
    categoryController.list().then(res=>{
      setListCate(res)
    })
  },[])

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Iconify icon="eva:close-fill" width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                      <FormControlLabel value={0} control={<Radio />} label={"All"} 
                        onClick={()=>changeCategory("")}
                      />
                    {listCate.length>0 && listCate.map((item) => (
                      <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.nameCategory} 
                        onClick={()=>changeCategory(item.nameCategory)}
                      />
                    ))}
                  </RadioGroup>
                </div>


              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Iconify icon="ic:round-clear-all" />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}

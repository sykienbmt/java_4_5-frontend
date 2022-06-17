import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default function UserList({ editUser,deleteUser,products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} editProduct={editProduct} deleteProduct={deleteProduct}/>
        </Grid>
      ))}
    </Grid>
  );
}

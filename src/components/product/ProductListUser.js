import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ProductCardShopPage from './ProductCardShopPage';

// ----------------------------------------------------------------------

ProductListUser.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductListUser({products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ProductCardShopPage product={product}/>
        </Grid>
      ))}
    </Grid>
  );
}

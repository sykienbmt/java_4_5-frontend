import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from 'src/utils/formatNumber';
import { useContext } from 'react';
import { CartContext } from 'src/contexts/CartContext';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ProductCardShopPage.propTypes = {
  product: PropTypes.object
};

export default function ProductCardShopPage({ product}) {
  const {id, name, category, price,description,image } = product;

  const navigate = useNavigate();

  const cartContext=useContext(CartContext)

  const addToCart=()=>{
    product.quantity=1
    cartContext.addToCart(product)
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}

        <ProductImgStyle alt={name} src={image} sx={{cursor:'pointer'}} onClick={()=>navigate(`/shop/${id}`)}/>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="subtitle2" noWrap>
            {category}
          </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography></Typography>
          <Typography variant="subtitle1" sx={{display:'flex',justifyContent:"space-between",width:"100%"}}>
            <Button variant="outlined" size='small' onClick={addToCart}>Add to Cart</Button>
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {999 && fCurrency(999)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

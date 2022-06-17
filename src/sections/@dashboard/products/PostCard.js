import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import Iconify from 'src/components/Iconify';
//
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

PostCard.propTypes = {
  post: PropTypes.object
};

export default function PostCard({ post,editProduct,deleteProduct }) {
  const {postId, name, categoryId,description,image } = post;

  return (
    <Card sx={{boxShadow:"0 0 15px 10px #ddd"}}>
      <Box sx={{ pt: '50%', position: 'relative' }}>

        <Box sx={{position:'absolute',top:"0",zIndex:2,fontSize:"22px",display:"flex",justifyContent:"space-between",width:"100%",p:"15px"}}>
          <RiDeleteBinLine onClick={(()=>deleteProduct(postId))} style={{cursor:"pointer",color:"white"}}/>
          <FiEdit onClick={()=>editProduct(post)} style={{cursor:"pointer",color:"white"}}/>
        </Box>
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Link to={`/dashboard/posts-lab6/${postId}`} color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="subtitle2" noWrap>
            {description.slice(0, 50).concat("...")}
          </Typography>
      </Stack>
    </Card>
  );
}

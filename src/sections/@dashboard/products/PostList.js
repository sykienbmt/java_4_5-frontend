import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import PostCard from './PostCard';

// ----------------------------------------------------------------------

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default function PostList({ editProduct,deleteProduct,posts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {posts.map((post) => (
        <Grid key={post.postId} item xs={12} sm={6} md={4} >
          <PostCard post={post} editProduct={editProduct} deleteProduct={deleteProduct}/>
        </Grid>
      ))}
    </Grid>
  );
}

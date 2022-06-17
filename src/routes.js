import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import HomePage from './userPage/HomePage';
import Category from './pages/Category';
import ProductPage from './userPage/ProductPage';
import DetailPage from './userPage/DetailPage';
import Cart from './pages/cart/Cart';
import OrderPage from './pages/order/OrderPage';
import Profile from './userPage/Profile';
import CategoryLab6 from './pages/CategoryLab6';
import PostLab6 from './pages/PostLab6';
import UserManager from './pages/UserManager';
import UsersManager from './pages/UsersManager';
import PostDetailPage from './pages/PostDetailPage';
import OrderManager from './pages/OrderManager';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <UsersManager /> },
        { path: 'category', element: <Category /> },
        { path: 'products', element: <Products /> },
        { path: 'orders', element: <OrderManager /> },
        { path: 'cate-lab6', element: <CategoryLab6 /> },
        { path: 'posts-lab6', element: <PostLab6 /> },
        { path: 'posts-lab6/:id', element: <PostDetailPage /> },
        // { path: 'posts-lab6/:id', element: <PostPageDetail /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'home', element: <HomePage /> },
        { path: 'shop', element: <ProductPage /> },
        { path: 'shop/:id', element: <DetailPage /> },
        { path: 'profile/:id', element: <Profile /> },
        { path: 'register', element: <Register /> },
        { path: 'orders', element: <OrderPage /> },
        { path: 'cart', element: <Cart /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

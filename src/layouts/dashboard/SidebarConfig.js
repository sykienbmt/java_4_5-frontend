// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon('bx:category')
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: getIcon('icon-park-outline:transaction-order')
  },
  {
    title: 'Cate Lab 6',
    path: '/dashboard/cate-lab6',
    icon: getIcon('carbon:category-new-each')
  },
  {
    title: 'Post Lab 6',
    path: '/dashboard/posts-lab6',
    icon: getIcon('map:post-box')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill')
  },
];

export default sidebarConfig;

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;

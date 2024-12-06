import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { CartProvider } from './context/CartContext';

const App = () => (
  <CartProvider>
    <Router>
      <AppRoutes />
    </Router>
  </CartProvider>
);

export default App;

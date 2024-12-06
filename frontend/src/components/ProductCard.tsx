import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import styles from './ProductCard.module.css';
import { useCart } from '../context/CartContext'; // Importera useCart
import axios from 'axios';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart(); // Hämta addToCart från Context

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5020/cart', {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      addToCart(product); // Uppdaterar frontend-varukorgen
      alert(`${product.name} har lagts till i kundvagnen.`);
    } catch (error) {
      console.error('Kunde inte lägga till i kundvagnen:', error);
      alert('Ett fel uppstod när produkten skulle läggas till i kundvagnen.');
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productPrice}>Pris: {product.price} kr</p>
      <Link to={`/product/${product.id}`} className={styles.link}>
        Visa mer
      </Link>
      <button onClick={handleAddToCart} className={styles.addToCart}>
        Lägg till i kundvagn
      </button>
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';
import { Product } from '../types/product';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Produkter</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { Product } from '../types/product';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id))
        .then(setProduct)
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [id]);

  if (!product) {
    return <p>Laddar produkt...</p>;
  }

  return (
    <div className={styles.page}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>Pris: {product.price} kr</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p>{product.stock}st i lager</p>
        <Link to='/' className={styles.backLink}>
          Tillbaka till produkter
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;

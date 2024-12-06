import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Varukorg</h1>
      {cart.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li className={styles.cartItem} key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h2 className={styles.cartItemName}>{item.name}</h2>
                <p className={styles.cartItemPrice}>Pris: {item.price} kr</p>
                <p className={styles.cartItemQuantity}>
                  Kvantitet: {item.quantity}
                </p>
              </div>
              <button
                className={styles.cartItemButton}
                onClick={() => removeFromCart(item.id)}
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;

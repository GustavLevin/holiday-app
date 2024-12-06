import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <h1>Julshoppen</h1>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link to='/'>Hem</Link>
            </li>

            <li>
              <Link to='/cart'>Varukorg</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />{' '}
      </main>
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Julshoppen AB. Alla rättigheter
          förbehållna.
        </p>
      </footer>
    </div>
  );
};

export default Layout;

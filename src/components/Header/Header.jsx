import iconSprite from '../../assets/icons.svg';
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg className={styles.icon}>
        <use xlinkHref={`${iconSprite}#icon-travel_trucks`}></use>
        </svg>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={styles.link}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

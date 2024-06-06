//src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => (
  <nav className={css.nav}>
    <div className={css.navLink}>
      <NavLink to="/" className={({ isActive }) => (isActive ? css.active : css.link)}>Home</NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? css.active : css.link)}>Movies</NavLink>
    </div>
    <h1 className={css.title}>Welcome to the MovieQuest</h1>
  </nav>
);

export default Navigation;

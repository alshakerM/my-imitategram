import { Icons } from '../Icons/Icons';
import {
  navContainer,
  navContent,
  navInput,
  navTitle,
} from './NavBar.module.css';

export function NavBar() {
  return (
    <nav>
      <div className={navContainer}>
        <div className={navContent}>
          <div className={navTitle}>Instagram</div>
          <div className="input-section">
            <input placeholder="Search" type="text" className={navInput} />
          </div>
          <div className="nav-icons">
            <Icons />
          </div>
        </div>
      </div>
    </nav>
  );
}

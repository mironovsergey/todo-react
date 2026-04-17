import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, CheckSquare } from 'lucide-react';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useLogout } from '@/hooks/use-auth';
import { ROUTES } from '@/utils/constants';
import styles from './header.module.scss';

export const Header = () => {
  const { user } = useAuthContext();
  const { mutate: logout, isPending } = useLogout();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.TODOS} className={styles.logo}>
          <CheckSquare size={24} />
          <span>Todo App</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            to={ROUTES.TODOS}
            className={`${styles.navLink} ${isActive(ROUTES.TODOS) ? styles.active : ''}`}
          >
            Todos
          </Link>
          <Link
            to={ROUTES.PROFILE}
            className={`${styles.navLink} ${isActive(ROUTES.PROFILE) ? styles.active : ''}`}
          >
            <User size={16} />
            {user?.name || user?.email}
          </Link>
          <button className={styles.logoutButton} onClick={() => logout()} disabled={isPending}>
            <LogOut size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
};

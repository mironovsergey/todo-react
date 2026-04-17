import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/header/header';
import styles from './app-layout.module.scss';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

import { Monitor, Smartphone, Globe } from 'lucide-react';
import { useSessions } from '@/hooks/use-user';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Badge } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { formatDate } from '@/utils/formatters';
import styles from './session-list.module.scss';

export const SessionList = () => {
  const { data: sessions, isLoading } = useSessions();
  const { logoutAll } = useAuthContext();

  const getDeviceIcon = (userAgent: string | null) => {
    if (!userAgent) {
      return <Globe size={16} />;
    }

    if (/mobile|iphone|android/i.test(userAgent)) {
      return <Smartphone size={16} />;
    }

    return <Monitor size={16} />;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Active Sessions</h2>
        {sessions && sessions.length > 1 && (
          <Button variant="danger" size="sm" onClick={logoutAll}>
            Sign out all
          </Button>
        )}
      </div>

      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <div className={styles.list}>
          {sessions?.map((session) => (
            <div key={session.id} className={styles.session}>
              <div className={styles.icon}>{getDeviceIcon(session.userAgent)}</div>
              <div className={styles.info}>
                <div className={styles.agent}>
                  {session.userAgent || 'Unknown device'}
                  {session.current && <Badge variant="success">Current</Badge>}
                </div>
                <div className={styles.meta}>
                  {session.ipAddress && <span>{session.ipAddress}</span>}
                  <span>{formatDate(session.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

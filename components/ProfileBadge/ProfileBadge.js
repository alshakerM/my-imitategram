import styles from './ProfileBadge.module.css';
import { LOGGED_IN_USER } from '../../stores/constants';

export function ProfileBadge() {
  return (
    <div className={styles.contentSection}>
      <img
        src="my-suit-pic.jpg"
        alt="profile pic"
        className={styles.profilePic}
      />
      <div className={styles.userInfo}>
        <p className={styles.userName}>
          <strong>{LOGGED_IN_USER}</strong>
        </p>
        <p className={styles.userRealName}>Marwan Alshaker</p>
      </div>
      <a
        href="https://github.com/alshakerM"
        className={styles.gitHubLink}
        target="_blank"
      >
        GitHub
      </a>
    </div>
  );
}

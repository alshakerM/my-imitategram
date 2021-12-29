import styles from './ProfileBadge.module.css';

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
          <strong>marwan.alshaker</strong>
        </p>
        <p className={styles.userRealName}>Marwan Ahmed</p>
      </div>
      <button className={styles.switchButton}>Switch</button>
    </div>
  );
}

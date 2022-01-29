import styles from './ProfileBadge.module.css';
import { LOGGED_IN_USER } from '../../stores/constants';
import Image from 'next/image';
import React from 'react';

export function ProfileBadge() {
  return (
    <div className={styles.contentSection}>
      <div className={styles.imgContainer}>
        <Image
          src="/my-suit-pic.jpg"
          alt="profile pic"
          width={270}
          height={270}
          layout="responsive"
          className={styles.profilePic}
        />
      </div>
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
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}

import styles from './FinePrint.module.css';
import React from 'react';
export function FinePrint() {
  return (
    <div>
      <ul className={styles.containerList}>
        <li className={styles.list}>About</li>
        <li className={styles.list}>Help</li>
        <li className={styles.list}>Press</li>
        <li className={styles.list}>API</li>
        <li className={styles.list}>Jobs</li>
        <li className={styles.list}>Privacy</li>
        <li className={styles.list}>Impressum/Terms/NetzDG/UrhDaG</li>
        <li className={styles.list}>Locations</li>
        <li className={styles.list}>Top account</li>
        <li className={styles.list}>Hashtags</li>
        <li className={styles.list}>Language</li>
      </ul>
      <p className={styles.instaText}>© 2021 Imitategram by AlshakerM</p>
    </div>
  );
}

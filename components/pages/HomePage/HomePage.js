import { Post } from '../../Post/Post';
import React from 'react';
import { Stories } from '../../Stories/Stories';
import { Suggestions } from '../../Suggestions/Suggestions';
import { useSelect } from '@wordpress/data';
import styles from './HomePage.module.css';

export function HomePage() {
  const data = useSelect((select) => select('ig-posts').getPosts());
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <Stories />
        {data?.map((datum, index) => (
          <Post
            datum={datum}
            comments={datum?.comments}
            index={index}
            key={datum.post_id}
          />
        ))}
      </div>
      <div className={styles.rightSide}>
        <div className={styles.fixedContent}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

import { Post } from '../Post/Post';
import React from 'react';
import '../App.css';
import { Stories } from '../Stories/Stories';
import { useIGData } from '../hooks/useIGData';
import { Suggestions } from '../Suggestions/Suggestions';
import styles from './HomePage.module.css';

export function HomePage({ setIsExpanded }) {
  const { data } = useIGData();
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <Stories />
        {data?.map((datum, index) => (
          <Post
            datum={datum}
            comments={datum?.comments}
            setIsExpanded={setIsExpanded}
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

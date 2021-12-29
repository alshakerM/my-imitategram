import { Post } from '../../Post/Post';
import React from 'react';
import { Stories } from '../../Stories/Stories';
import { Suggestions } from '../../Suggestions/Suggestions';
import { useSelect } from '@wordpress/data';
import styles from './HomePage.module.css';
import { ProfileBadge } from '../../ProfileBadge/ProfileBadge';
import { FinePrint } from '../../FinePrint/FinePrint';

export function HomePage() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const data = useSelect((select) => select('ig-posts').getPosts(pageNumber));
  const isLoading = useSelect((select) => select('ig-posts').getIsLoading());
  const itemsLeft = useSelect((select) => select('ig-posts').getItemsLeft());
  React.useEffect(() => {
    let scrollReachedEnd = false;
    const handler = () => {
      if (
        document.body.scrollHeight <
        window.pageYOffset + window.innerHeight + 500
      ) {
        if (!scrollReachedEnd && !isLoading && itemsLeft > 0) {
          setPageNumber((p) => p + 1);
          scrollReachedEnd = true;
        }
      } else {
        scrollReachedEnd = false;
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [setPageNumber, isLoading]);

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
        {itemsLeft === 0 && !isLoading && (
          <div>
            <h1 className={styles.noMoreText}>Sorry no more Posts</h1>
          </div>
        )}
      </div>

      <div className={styles.rightSide}>
        <div className={styles.fixedContent}>
          <ProfileBadge />
          <Suggestions />
          <FinePrint />
        </div>
      </div>
    </div>
  );
}

import styles from './Avatar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

export function Avatar({
  user,
  className,
  size = 'small',
  animate,
  colorRing,
  isUnread = true,
}) {
  const dimensions = {};
  switch (size) {
    case 'small':
      dimensions.SVGDiameter = 42;
      dimensions.strokeWidth = 10;
      break;
    case 'medium':
      dimensions.SVGDiameter = 66;
      dimensions.strokeWidth = 8;
      break;
    case 'large':
      dimensions.SVGDiameter = 168;
      dimensions.strokeWidth = 5;
      break;
    default:
      dimensions.imgDiameter = size;
      dimensions.SVGDiameter = size;
      break;
  }

  return (
    <Link to={`/stories/${user.user_id}`} className={className}>
      <svg
        viewBox={`0 0 300 300`}
        width={dimensions.SVGDiameter}
        className={styles.animationSvg}
      >
        {colorRing && (
          <g>
            <circle
              className={cx(styles.animationCircle, {
                [styles.isAnimated]: animate,
              })}
              cx={150}
              cy={150}
              r={140}
              stroke={isUnread ? 'url(#ig-grad)' : '#8e8e8e'}
              stroke-width={dimensions.strokeWidth}
              fill="none"
              stroke-linecap="round"
            />
          </g>
        )}
        <foreignObject x="0" y="0" width="300" height="300">
          <img
            style={{ margin: 20 }}
            src={user?.user_thumbnail}
            alt={`${user?.user_name} avatar`}
            className={styles.userAvatar}
            width="260"
            height="260"
          />
        </foreignObject>
      </svg>
    </Link>
  );
}

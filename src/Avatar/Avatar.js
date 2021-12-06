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
      dimensions.imgDiameter = 32;
      dimensions.strokeWidth = 2;
      dimensions.imgMargin = 5;
      break;
    case 'medium':
      dimensions.SVGDiameter = 66;
      dimensions.imgDiameter = 56;
      dimensions.strokeWidth = 2;
      dimensions.imgMargin = 5;
      break;
    case 'large':
      dimensions.SVGDiameter = 168;
      dimensions.imgDiameter = 150;
      dimensions.strokeWidth = 3;
      dimensions.imgMargin = 9;
      break;
    default:
      dimensions.imgDiameter = size;
      dimensions.SVGDiameter = size;
      break;
  }

  return (
    <Link to={`/stories/${user.user_id}`} className={className}>
      <svg
        viewBox={`0 0 ${dimensions.SVGDiameter} ${dimensions.SVGDiameter}`}
        width={dimensions.SVGDiameter}
        className={styles.animationSvg}
      >
        {colorRing && (
          <circle
            className={cx(styles.animationCircle, {
              [styles.isAnimated]: animate,
            })}
            cx={dimensions.SVGDiameter / 2}
            cy={dimensions.SVGDiameter / 2}
            r={dimensions.SVGDiameter / 2 - dimensions.strokeWidth}
            stroke={isUnread ? 'url(#ig-grad)' : '#8e8e8e'}
            stroke-width={dimensions.strokeWidth}
            fill="none"
            stroke-linecap="round"
          />
        )}
        <foreignObject
          x="0"
          y="0"
          width={dimensions.SVGDiameter}
          height={dimensions.SVGDiameter}
        >
          <img
            style={{ margin: dimensions.imgMargin }}
            src={user?.user_thumbnail}
            alt={`${user?.user_name} avatar`}
            className={styles.userAvatar}
            width={dimensions.imgDiameter}
            height={dimensions.imgDiameter}
          />
        </foreignObject>
      </svg>
    </Link>
  );
}

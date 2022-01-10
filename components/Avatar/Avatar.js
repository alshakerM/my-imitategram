import styles from './Avatar.module.css';
import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

export function Avatar({
  user,
  className,
  size = 'small',
  animate,
  colorRing,
  isUnread = true,
  link = `/stories/${user.user_id}`,
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
    <Link href={link}>
      <a className={className}>
        <svg
          viewBox={`0 0 300 300`}
          width={dimensions.SVGDiameter}
          className={styles.animationSvg}
        >
          <linearGradient id="ig-grad" x1="6" x2="3" y1="5" y2="8.2">
            <stop stopColor="#dd326e" offset="0%" />
            <stop stopColor="#fdd074" offset="25%" />
            <stop stopColor="#FD1D1D" offset="50%" />
            <stop stopColor="#dd326e" offset="75%" />
            <stop stopColor="#a432b1" offset="100%" />
          </linearGradient>
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
                strokeWidth={dimensions.strokeWidth}
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}
          <foreignObject x="0" y="0" width="300" height="300">
            {user?.user_thumbnail && (
              <div style={{ margin: 20 }}>
                <Image
                  src={user.user_thumbnail}
                  alt={`${user.user_name} avatar`}
                  className={styles.userAvatar}
                  width="260"
                  height="260"
                />
              </div>
            )}
          </foreignObject>
        </svg>
      </a>
    </Link>
  );
}

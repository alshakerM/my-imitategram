import './Avatar.css';
import cx from 'classnames';

export function Avatar({ avatar, size = 32, borderColor, alt, ...props }) {
  return (
    <img
      src={avatar}
      className={cx('user-avatar', { 'is-bordered': !!borderColor })}
      width={size}
      height={size}
      alt={alt}
      style={{ borderColor }}
      {...props}
    />
  );
}

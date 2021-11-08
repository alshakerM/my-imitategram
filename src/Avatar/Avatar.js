import "./Avatar.css"


export function Avatar({ avatar, size = 32, ...props }) {
  return (
    <img
      src={avatar}
      className="user-avatar"
      width={size}
      height={size}
      {...props}
    />
  );
}

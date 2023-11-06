import Avatar from 'react-avatar';
interface ProfileAvatarProps {
  src: string;
  round: string;
  size: string;
  style: React.CSSProperties;
  role: string;
}
export const ProfileAvatar = ({
  src,
  round,
  size,
  style,
}: ProfileAvatarProps) => {
  const image = src;
  return (
    <Avatar
      src={image}
      round={round}
      size={size}
      style={style}
      alt="Profile avatar"
    />
  );
};

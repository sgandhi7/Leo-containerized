import Avatar from 'react-avatar';
interface ProfileAvatarProps {
  src: string;
  round: string;
  size: string;
  style: React.CSSProperties;
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
      aira-label="An avatar image"
    />
  );
};

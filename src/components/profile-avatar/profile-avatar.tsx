import Avatar from 'react-avatar';
interface ProfileAvatarProps {
  src: string;
  round: string;
  size: string;
  style: React.CSSProperties;
}
function ProfileAvatar(props: ProfileAvatarProps) {
  console.log('PROPS:, ', props);
  const image = props.src;
  return (
    <Avatar
      src={image}
      round={props.round}
      size={props.size}
      style={props.style}
    />
  );
}

export default ProfileAvatar;

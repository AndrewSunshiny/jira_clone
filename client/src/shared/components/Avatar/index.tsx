import { StyledImage, StyledLetter } from './styles';

const colors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA',
];

const getColorFromName = (name: string): string =>
  colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

interface Props {
  className?: string;
  avatarUrl?: string | null;
  name?: string;
  size?: number;
}
const Avatar = ({ className = undefined, avatarUrl = null, name = '', size = 24 }: Props) => {
  if (avatarUrl) return <StyledImage className={className} $size={size} $avatarUrl={avatarUrl} />;

  return (
    <StyledLetter className={className} $size={size} $color={getColorFromName(name)}>
      <span>{name.charAt(0)}</span>
    </StyledLetter>
  );
};

export default Avatar;

import Avatar from '@mui/material/Avatar';

export default function NamedAvatar(props) {
    let { name } = props; 
    if (name == undefined || name === '') name = "AN";

    let hash = 0;
    let i;
  
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    const initials = `${name.toUpperCase()[0]}${name.toUpperCase()[1]}`
    const textColor = parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? 'black' : 'white';

    return (
        <Avatar {...props} sx={{ bgcolor: color, color: textColor }} children={initials} />
    )
}
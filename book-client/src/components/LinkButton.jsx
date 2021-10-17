import { Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button';

const LinkButton = (props) => {
  return <Button {...props} component={RouterLink} to={props.to}>{props.children}</Button>
}

export default LinkButton;
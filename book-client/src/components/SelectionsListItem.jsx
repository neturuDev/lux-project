import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const SelectionsListItem = ({author, title, email, date, id, books}) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Author: {author}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Email: {email}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Date: {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Delete selection
        </Button>
      </CardActions>
    </Card>
  );
}

export default SelectionsListItem;
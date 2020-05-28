import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingTop: 10,
    PaddingRight: 7,
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
      <footer className={props.classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1"><EmailIcon fontSize="small" className={classes.icon}/>germangp088@gmail.com</Typography>
          <Typography variant="body1"><PhoneIcon fontSize="small" className={classes.icon}/>(111) 1111 - 1111</Typography>
        </Container>
      </footer>
  );
}

export default Footer;
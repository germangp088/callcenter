import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CallIcon from '@material-ui/icons/Call';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';

const Header = (props) => {
  return (
    <AppBar position="relative">
        <Toolbar>
          <CallIcon className={props.classes.icon} />
          <Typography variant="body1">Call Center</Typography>
          <Navbar classes={props.classes} />
        </Toolbar>
    </AppBar>
  );
}

export default Header;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingTop: 5,
    PaddingRight: 5,
  },
}));

const CheckOut = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        <Typography component="p" variant="p"className={props.instructions} gutterBottom>
          <DoneIcon fontSize="small" className={classes.icon}/> All steps completed - order code: {props.order_id}
        </Typography>
        <Typography component="p" variant="p" className={props.instructions} gutterBottom>
          <AvTimerIcon fontSize="small" className={classes.icon}/>Estimated time: 20 - 40 min.
        </Typography>
        <Button
            color="secondary"
            aria-label="home"
            href="/"
            onClick={props.finish}
            startIcon={<Home />}
          >
            Home
        </Button>
      </div>
    </React.Fragment>
  );
}

export default CheckOut;
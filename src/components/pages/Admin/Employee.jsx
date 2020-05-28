import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(3),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(0, 0, 2, 0),
  },
  paper: {
    padding: theme.spacing(3, 3, 3, 3),
    marginBottom: theme.spacing(3),
    alignItems: 'center'
  },
}));

const Order = (props) => {
  const classes = useStyles();

  const { type, quantity } = props;

  return (
    <Grid  item lg={4} alignContent="center">
      <Paper elevation={3} className={classes.paper}>
        <Typography
          variant="h5" component="h2"
          align="center"
          color="textPrimary">
          {type}
        </Typography>
        <TextField
          fullWidth
          type="number"
          size="medium"
          className={classes.input}
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          value={quantity}
          onChange={(e) => props.changeEmployeeQty(e)}
        />
      </Paper>
    </Grid>
  );
}

export default Order;
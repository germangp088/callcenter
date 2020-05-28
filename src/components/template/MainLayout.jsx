import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    position: 'absolute',
    right: 0,
    backgroundColor: theme.palette.primary.main,
  },
  navitem: {
    color: theme.palette.background.default,
    '&$selected': {
      color: theme.palette.secondary.main,
    },
  },
  order: {
    width: '100%'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
  },
  selected: {},
}));

const MainLayout = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Header classes={classes} />
        <Container component="main" className={classes.main} maxWidth="lg">
            {children}
        </Container>
        <Footer classes={classes} />
      </div>
  );
}

export default MainLayout;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckOut from './CheckOut';
import Order from './Order';
import CustomerForm from './CustomerForm';
import { AppConsumer } from "../../../context";
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3, 3, 3, 3),
    marginTop: theme.spacing(3),
  },
}));

const OrderProcess = () => {

  const getSteps = () => ['Personal information', 'Checkout'];

  const classes = useStyles();

  const [values, setValues] = React.useState({
    nameError: false,
    emailError: false,
    phoneError: false,
    addressError: false
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isEmpty = (str) => str === ""
  
  const validPhone = (str) => {
    if(isEmpty(str)){
      return false;
    }
    if(!/^[(]?[0-9]{3}[)]? [0-9]{3}[-]?[0-9]{4}$/im.test(str)) {
      return false;
    }
    return true;
  }

  const validEmail = (mail) => {
    if(isEmpty(mail)){
      return false;
    }
    // eslint-disable-next-line 
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return false;
    }
    return true;
  }

  const validateOnBlur = (value, field, callback) => {
    switch (field) {
      case 'name':
        setError('nameError', isEmpty(value));
        break;
      case 'email':
        setError('emailError', !validEmail(value));
        break;
      case 'contact_number':
        setError('phoneError', !validPhone(value));
        break;
      default:
        setError('addressError', isEmpty(value));
        break;
    }
    callback(field, value);
  }

  const setError = (eAttr, value) => {
    values[eAttr] = value;
  }

  return (
    <AppConsumer>
      {value => {
        const { cart, customer, changeCustomerValue, postOrder, order_id, finish, errorMessage } = value;

        const getStepContent = (step) => {
          switch (step) {
            case 0:
              return <CustomerForm
                      customer={customer}
                      changeCustomerValue={changeCustomerValue}
                      values={values}
                      setValues={setValues}
                      setError={setError}
                      validateOnBlur={(value, field) => validateOnBlur(value, field, changeCustomerValue)}
                    />;
            case 1:
              if(isEmpty(customer.name) || !validEmail(customer.email) || 
                !validPhone(customer.contact_number) || isEmpty(customer.delivery_address)) {
                setValues({
                  nameError: isEmpty(customer.name),
                  emailError: !validEmail(customer.email),
                  phoneError: !validPhone(customer.contact_number),
                  addressError: isEmpty(customer.delivery_address)
                });
                handleBack();
              }
              return <Order />;
            default:
              return 'Unknown step';
          }
        };

        return (
          <div className={classes.root}>
            {
              cart.length === 0 && <Redirect to='/'/>
            }
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Container className={classes.cardGrid} maxWidth="md">
              <Paper 
                elevation={3} 
                className={classes.paper}>
                {activeStep === steps.length ? (
                  <CheckOut
                    instructions={classes.instructions}
                    order_id={order_id}
                    finish={finish}
                  />
                ) : (
                  <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      {
                        activeStep === steps.length - 1 ?
                        <React.Fragment>
                          <FormHelperText error={true}>{ errorMessage && 'There was an error trying to place order.'}</FormHelperText>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => postOrder(handleNext)}
                            className={classes.button}
                          >
                            Place order
                          </Button> 
                        </React.Fragment> :
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>}
                    </div>
                  </div>
                )}
              </Paper>
            </Container>
          </div>
        );
      }}
    </AppConsumer>
  );
}

export default OrderProcess;
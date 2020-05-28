import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Phone from './Phone';

const CustomerForm = (props) => {

  const { values } = props;

  const onChange = (e, eAttr, attr, validation = "") =>{
    if(!e.target.value || e.target.value === validation){
      props.setError(eAttr, true);
      props.changeCustomerValue(attr, e.target.value)
    } else {
      props.setError(eAttr, false);
      props.changeCustomerValue(attr, e.target.value)
    }
  }

  const onBlur = (e, field) => {
    props.validateOnBlur(e.target.value, field);
  }

  const { name, email, delivery_address, contact_number } = props.customer;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Full name"
            fullWidth
            value={name}
            error={values.nameError}
            helperText={values.nameError && "Invalid name."}
            onChange={(e) => onChange(e, "nameError", "name")}
            onBlur={(e) => onBlur(e, "name")}
          />
        </Grid>
        <Phone
          setError={props.setError}
          onChange={onChange}
          changeCustomerValue={props.changeCustomerValue}
          contact_number={contact_number}
          values={values}
          setValues={props.setValues}
          onBlur={onBlur}
        />
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            error={values.emailError}
            helperText={values.emailError && "Invalid email."}
            onChange={(e) => onChange(e, "emailError", "email")}
            onBlur={(e) => onBlur(e, "email")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            value={delivery_address}
            error={values.addressError}
            helperText={values.addressError && "Invalid address."}
            onChange={(e) => onChange(e, "addressError", "delivery_address")}
            onBlur={(e) => onBlur(e, "delivery_address")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CustomerForm;
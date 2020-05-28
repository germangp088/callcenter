import React from 'react';
import { FormHelperText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Employee from './Employee';
import { getEmployees, putEmployees } from "../../../request";
import Loading from '../../common/Loading';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: null,
      loading: true,
      success: false,
      errorMessage: ''
    };
    this.getEmployees = this.getEmployees.bind(true);
    this.putEmployees = this.putEmployees.bind(true);
    this.changeEmployeeQty = this.changeEmployeeQty.bind(true);
    this.handleClose = this.handleClose.bind(true);
  }

  componentDidMount= async() => {
    await this.getEmployees();
  }

  changeEmployeeQty = (key, qty) => {
    this.setState({
      employees: {
        ...this.state.employees,
        [key]: parseFloat(qty)
      }
    });
    console.log(this.state)
  }

  getEmployees = async() => {
    try {
      this.setState({
        loading: true
      });
      const result = await getEmployees();
      this.setState({
        employees: {
          l1OpQty: result.l1OpQty ,
          supervisorQty: result.supervisorQty,
          managerQty: result.managerQty
        },
        loading: false
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false
      });
    }
  }

  putEmployees = async() =>{
    console.log(this.state.employees)
    try {
      this.setState({
        loading: true
      });
      await putEmployees({ request: this.state.employees });
      this.setState({
        success: true,
        loading: false
      });
    } catch (error) {
      console.log({error})
      this.setState({
        errorMessage: error.message,
        loading: false
      });
    }
  }



  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      success: false
    });
  };

  render() {
    return (
      <main>
        <Snackbar open={this.state.success} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Employees was updated successfully!
          </Alert>
        </Snackbar>
        <Loading open={this.state.loading} />
        <FormHelperText error={true}>{ this.state.errorMessage && 'There was an error trying to save employees.'}</FormHelperText>
        <Typography variant="h4" align="center" gutterBottom>
          Employees
        </Typography>
        {
          this.state.employees &&
          <Grid container spacing={3} alignContent="center">
            <Employee
              type="Level 1 operator"
              quantity={this.state.employees.l1OpQty}
              changeEmployeeQty={(e) => this.changeEmployeeQty("l1OpQty", e.target.value)} />
            <Employee
              type="Supervisor"
              quantity={this.state.employees.supervisorQty}
              changeEmployeeQty={(e) => this.changeEmployeeQty("managerQty", e.target.value)} />
            <Employee
              type="Manager"
              quantity={this.state.employees.managerQty}
              changeEmployeeQty={(e) => this.changeEmployeeQty("supervisorQty", e.target.value)} />
            <Grid  item lg={12} alignContent="center">
              <Button variant="contained" color="primary" onClick={this.putEmployees}>
                Save
              </Button>
            </Grid>
          </Grid>
        }
      </main>
    );
  }
}

export default History;
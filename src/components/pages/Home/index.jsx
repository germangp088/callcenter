import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { getChat } from "../../../request";
import Loading from '../../common/Loading';
import Chat from './Chat';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      loading: true,
      errorMessage: '',
      notFound: false
    };
    this.getChat = this.getChat.bind(true);
  }

  componentDidMount= async() => {
    await this.getChat();
  }

  getChat = async() => {
    try {
      this.setState({
        loading: true
      });
      const employee = await getChat();
      this.setState({
        employee: employee,
        loading: false
      });
    } catch (error) {
      if(error.status === 404) {
        this.setState({
          notFound: true,
          loading: false
        });
      } else {
        this.setState({
          errorMessage: error.message,
          loading: false
        });
      }
    }
  }

  render() {
    return (
      <main>
        <Loading open={this.state.loading} />
        <FormHelperText error={true}>
          { this.state.errorMessage && 'There was an error trying to retrieve information, come back later.'}
        </FormHelperText>
        {
          this.state.notFound ? <Typography variant="h5" className="header-message">All our operators are busy, try again later.</Typography> : <Chat employee={this.state.employee} />
        }
      </main>
    );
  }
}

export default Home;
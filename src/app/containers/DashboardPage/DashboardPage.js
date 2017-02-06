import React from 'react';
import Auth from '../../authentication/auth-helper';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      secretData: ''
    };
  }

  componentDidMount() {
    Auth.get('/api/dashboard', (errors, success) => {
      if (errors) {
        this.setState({ errors });
      } else {
        this.setState({ secretData: success.message });
      }
    });
  }

  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;

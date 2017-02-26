import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData } from '../../actions';

class DashboardPage extends React.Component {

  static needs = [fetchDashboardData];

  static propTypes = {
    loading: PropTypes.bool,
    secretData: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      secretData: ''
    };
  }

  componentDidMount() {
    if (this.props.secretData) return;
    this.props.fetchDashboardData();
  }

  render() {
    const { secretData, loading = false } = this.props;
    return (<Dashboard id="dashboard-page" loading={loading} secretData={secretData} />);
  }
}

function mapStateToProps(state) {
  return {
    secretData: state.dashboard.secretData,
    loading: state.dashboard.loading,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData }
)(DashboardPage);

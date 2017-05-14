import React from 'react';
import { connect } from 'react-redux';

import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData } from '../../actions';

class DashboardPage extends React.Component {

  static needs = [fetchDashboardData];

  componentDidMount() {
    if (this.props.secretData) return;
    this.props.fetchDashboardData();
  }

  render() {
    return (<Dashboard id="dashboard-page" />);
  }
}

function mapStateToProps(state) {
  return {
    secretData: state.dashboard.data,
    loading: state.actionState.loading,
    error: state.actionState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData }
)(DashboardPage);

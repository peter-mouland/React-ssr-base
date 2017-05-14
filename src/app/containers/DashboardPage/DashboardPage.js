import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData } from '../../actions';

class DashboardPage extends React.Component {

  static needs = [fetchDashboardData];

  static propTypes = {
    loading: PropTypes.bool,
    secretData: PropTypes.string
  };

  componentDidMount() {
    if (this.props.secretData) return;
    this.props.fetchDashboardData();
  }

  render() {
    const { secretData, loading = false, errors = [] } = this.props;
    return (<Dashboard id="dashboard-page"
                       loading={loading}
                       error={errors[0]}
                       secretData={secretData}
    />);
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

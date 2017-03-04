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

  componentDidMount() {
    if (this.props.secretData) return;
    this.props.fetchDashboardData();
  }

  render() {
    const { secretData, loading = false, error } = this.props;
    return (<Dashboard id="dashboard-page"
                       loading={loading}
                       error={error}
                       secretData={secretData}
    />);
  }
}

function mapStateToProps(state) {
  return {
    secretData: state.dashboard.secretData,
    loading: state.dashboard.loading,
    error: state.dashboard.error,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData }
)(DashboardPage);

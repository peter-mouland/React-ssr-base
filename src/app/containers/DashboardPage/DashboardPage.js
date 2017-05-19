import React from 'react';
import { connect } from 'react-redux';

import Auth from '../../authentication/auth-helper';
import Admin from '../../components/Admin/Admin';
import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData, fetchSeasons } from '../../actions';

class DashboardPage extends React.Component {

  static needs = [fetchDashboardData, fetchSeasons];

  componentDidMount() {
    if (this.props.dashboardData) return;
    this.props.fetchDashboardData();
  }

  render() {
    const { seasons } = this.props;

    return (
      <section>
        <Dashboard id="dashboard-page" />
        {Auth.isAdmin() && <Admin seasons={ seasons } />}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboardData: state.dashboard.data,
    seasons: state.seasons.data,
    loading: state.actionState.loading,
    error: state.actionState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData, fetchSeasons }
)(DashboardPage);

import React from 'react';
import { connect } from 'react-redux';

import Auth from '../../authentication/auth-helper';
import Admin from '../../components/Admin/Admin';
import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData, fetchSeasons } from '../../actions';

const Error = ({ error }) => <div>
  <p>Error Loading seasons!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
</div>;

const Loading = () => <p>Loading seasons....</p>;


class DashboardPage extends React.Component {

  static needs = [fetchSeasons];

  componentDidMount() {
    if (this.props.seasons) return;
    this.props.fetchSeasons();
  }

  render() {
    const { errors = [], loading, seasons } = this.props;

    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (loading || !seasons) {
      return <Loading />;
    }


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
    seasons: state.seasons.data,
    loading: state.actionState.loading,
    errors: state.actionState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData, fetchSeasons }
)(DashboardPage);

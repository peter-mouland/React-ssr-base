import React from 'react';
import { connect } from 'react-redux';

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
      <Dashboard id="dashboard-page" />
    );
  }
}

function mapStateToProps(state) {
  return {
    seasons: state.seasons.data,
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData, fetchSeasons }
)(DashboardPage);

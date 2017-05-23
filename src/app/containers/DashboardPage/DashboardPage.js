import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from '../../components/Dashboard/Dashboard';
import { fetchDashboardData } from '../../actions';

const Error = ({ error }) => <div>
  <p>Error Loading seasons!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
</div>;

const Loading = () => <p>Loading seasons....</p>;


class DashboardPage extends React.Component {

  static needs = [fetchDashboardData];

  static propTypes = {
    secretData: PropTypes.string
  };

  componentDidMount() {
    if (this.props.secretData) return;
    this.props.fetchDashboardData();
  }

  render() {
    const { errors = [], loading, secretData } = this.props;

    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (loading || !secretData) {
      return <Loading />;
    }

    return (<Dashboard id="dashboard-page" secretData={secretData} />);
  }
}

function mapStateToProps(state) {
  return {
    secretData: state.dashboard.secretData,
    loading: state.dashboard.loading,
    errors: state.dashboard.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchDashboardData }
)(DashboardPage);

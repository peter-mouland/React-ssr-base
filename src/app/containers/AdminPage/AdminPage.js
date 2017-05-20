import React from 'react';
import { connect } from 'react-redux';

import Auth from '../../authentication/auth-helper';
import Admin from '../../components/Admin/Admin';
import { fetchSeasons } from '../../actions';

const Error = ({ error }) => <div>
  <p>Error Loading seasons!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
</div>;

const Loading = () => <p>Loading seasons....</p>;


class AdminPage extends React.Component {

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
  { fetchSeasons }
)(AdminPage);

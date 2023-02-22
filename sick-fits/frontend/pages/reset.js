import PropTypes from 'prop-types';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token.</p>
        <RequestReset />
      </div>
    );
  }
  const { token } = query;

  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={token} />
    </div>
  );
}

ResetPage.propTypes = {
  query: PropTypes.any,
};

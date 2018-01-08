import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {" | "}
    <Link to="/login" activeClassName="active">Login</Link>
    {" | "}
   <Link to="/bucketlists" activeClassName="active">View Bucketlists</Link>
    </nav>
  );
};
export default Header;

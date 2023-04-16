import React from 'react';
import { Redirect } from 'react-router-dom';

const Isloggedin = (Component) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  return class extends React.Component {
    render() {
      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return <Redirect to='/login' />;
      }
    }
  };
};

export default Isloggedin;

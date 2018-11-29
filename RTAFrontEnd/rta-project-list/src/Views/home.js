//@flow
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import React from 'react'

import Menu from '../Widgets/Menu'

export default props => {
  return (
    <div className="container">
      <Menu />
    </div>
  );
};
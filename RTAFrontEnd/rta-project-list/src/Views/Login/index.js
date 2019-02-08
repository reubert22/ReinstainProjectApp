import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  handleInput = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { email } = this.state;
    return (
      <div className="container-login">
        <div className="container-box-center">
          <div className="container-content">
            <div className="container-logo">
              <span className="txt-logo">ReinstainProject</span>
            </div>
            <div className="container-form">
              <form action="/#">
                <input
                  className="login-input-email"
                  type="text"
                  name="firstname"
                  value={email}
                  onChange={this.handleInput}
                  placeholder="Email or username"
                />
              </form>
            </div>
            <div className="container-button">
              <Link to="/Home">
                <button className="next-btn" type="button">
                  <span className="txt-next-btn">Next</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

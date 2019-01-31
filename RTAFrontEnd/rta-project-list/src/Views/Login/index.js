import React, { PureComponent } from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';

class Login extends PureComponent {
  render() {
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
                  value=""
                  placeholder="Email"
                />
              </form>
            </div>
            <div className="container-button">
              <button className="next-btn" type="button">
                <span className="txt-next-btn">Próximo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

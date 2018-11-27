import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends PureComponent<> {
	constructor(props) {
		super(props);
		this.state = {
			token: "empty",
			email: "empty",
			id: "empty"
		}
		this.gettingInformations = this.gettingInformations.bind(this);
	}
	componentDidMount() {
		this.gettingInformations();
	}

	gettingInformations() {
		axios.post('http://localhost:3000/auth/authenticate', {
			email: 'reubert@gmail.com',
			password: 'reubert'
		}).then(response => {
			console.log(response.data)
			this.setState({
				token: response.data.token,
				id: response.data.user._id,
				email: response.data.user.email
			})
		}).catch(err => {
			console.log(err)
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Token: {this.state.token}
					</p>
					<p>
						Id: {this.state.id}
					</p>
					<p>
						Email: {this.state.email}
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
          </a>
				</header>
			</div>
		);
	}
}

export default App;

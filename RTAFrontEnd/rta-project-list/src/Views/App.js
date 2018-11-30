//@flow
import React, { PureComponent } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Menu from '../Widgets/Menu'

import '../Styles/App.css'; import Banner from '../Imgs/banner.jpg'

class App extends PureComponent<> {
	render() {
		return (
			<React.Fragment>
				<div className="column menu" >
					<div className="row">
						<div className="navbar navbar-expand-lg navbar-inverse bg-inverse">
							<a className="navbar-brand" href="#">Navbar</a>
						</div>
					</div>
					<section className="section1">
						<div className="container content">
							<div className="row justify-content-center">
								<div className="col-lg-6 text-center">
									<p className="lead mb-0">
										Project list
								</p>
								</div>
							</div>
						</div>
					</section>
				</div>

			</React.Fragment >
		)
	}
}

export default App;

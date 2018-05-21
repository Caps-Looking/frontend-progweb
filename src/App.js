import React, { Component } from 'react';

import SideBar from './components/templates/SideBar';
import Header from './components/templates/Header';
import Routes from './components/templates/Routes';

export default class App extends Component {

	// componentDidMount() {
	// 	window.addEventListener("storage", () => {
	// 		console.log("asd")
	// 	})
	// }

	render() {
		return (
			<div style={{ backgroundColor: '#fafcfe', width: '99%' }}>
				<Header />
				<div className="row" style={{ marginTop: '70px' }}>
					<SideBar />
					<Routes />
				</div>
			</div>
		);
	}

}

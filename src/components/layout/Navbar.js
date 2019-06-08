import React, { Component } from "react";
import PropTypes from "prop-types";

export class Navbar extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired
	};
	render () {
		return (
			<nav className="navbar bg-primary">
				<h1>
					<i className="fab fa-github" />
					{this.props.title}
				</h1>
			</nav>
		);
	}
}

export default Navbar;

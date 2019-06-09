import React from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import axios from "axios";
import "./App.css";

class App extends React.Component {
	state = {
		users: [],
		loading: false
	};

	// search Github users
	searchUsers = async text => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
		);
		this.setState({ users: res.data.items, loading: false });
	};

	render () {
		return (
			<div className="App">
				<Navbar title=" Github Finder" />
				<div className="container">
					<Search searchUsers={this.searchUsers} />
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;

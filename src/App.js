import React from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends React.Component {
	state = {
		users: [],
		loading: false,
		alert: null
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

	// clear the users that are currently in state
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => {
			this.setState({ alert: null });
		}, 4000);
	};

	render () {
		const { loading, users } = this.state;
		return (
			<div className="App">
				<Navbar title=" Github Finder" />
				<div className="container">
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;

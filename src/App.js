import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	// search Github users
	const searchUsers = async text => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
		);
		setUsers(res.data.items);
		setLoading(false);
	};

	// get single user
	const getUser = async username => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
		);
		setUser(res.data);
		setLoading(false);
	};

	// get users repos
	const getUserRepos = async username => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
		);
		setRepos(res.data);
		setLoading(false);
	};

	// clear the users that are currently in state (and shown on screen)
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// alert to ensure the user enters text in the search field
	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 4000);
	};

	return (
		<Router>
			<div className="App">
				<Navbar title=" Github Finder" />
				<div className="container">
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path="/"
							render={props => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path="/about" component={About} />
						<Route
							exact
							path="/user/:login"
							render={props => (
								<User
									{...props}
									getUser={getUser}
									user={user}
									loading={loading}
									getUserRepos={getUserRepos}
									repos={repos}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;

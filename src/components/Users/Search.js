import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/AlertContext";

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [ text, setText ] = useState("");

	const onChange = e => setText(e.target.value);

	const onSubmit = e => {
		e.preventDefault();
		// check whether or not text has been entered into the search field
		if (text === "") {
			alertContext.setAlert("Please enter some text", "light");
		} else {
			githubContext.searchUsers(text);
			// reset the text value of the search field
			setText("");
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit} className="form">
				<input type="text" name="text" placeholder="Search Users" value={text} onChange={onChange} />
				<input type="submit" value="search" className="btn btn-dark btn-block" />
			</form>
			{githubContext.users.length > 0 && (
				<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;

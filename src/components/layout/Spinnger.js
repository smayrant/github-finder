import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinnger = () => (
	<Fragment>
		<img src={spinner} alt="loading..." style={{ width: "200px", margin: "auto", display: "block" }} />
	</Fragment>
);

export default Spinnger;

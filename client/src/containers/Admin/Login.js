import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { setView, logUserIn, logUserOut } from "../../store/actions";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

class Login extends Component {
	state = {
		email: "",
		password: "",
		expanded: 1,
	};

	componentDidMount() {
		this.props.setView("login");
	}

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();
		this.props.logUserIn(this.state);
	};

	// Make validation for form

	render() {
		return this.props.user.isAuth ? (
			<Redirect to={{ pathname: "/" }} />
		) : (
			<div id="Login">
				<Accordion
					expanded={this.state.expanded !== 2}
					onClick={() => this.setState({ expanded: 1 })}
				>
					<AccordionSummary>
						<h2>Login</h2>
					</AccordionSummary>
					<AccordionDetails>
						<LoginForm />
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={this.state.expanded !== 1}
					onClick={() => this.setState({ expanded: 2 })}
				>
					<AccordionSummary>
						<h2>Register</h2>
					</AccordionSummary>
					<AccordionDetails>
						<RegisterForm />
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setView, logUserIn, logUserOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

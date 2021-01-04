import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "./firebase";
import { useEffect } from "react";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Profile() {
	const classes = useStyles();
	const [username, setusername] = useState("Name");
	const [email, setemail] = useState("Email");

	const [user, setUser] = useState();
	const [firebaseInitialized, setfirebaseInitialized] = useState();
	var result;

	useEffect(() => {
		firebase.isInitialized().then((val) => {
			if (val) {
				setfirebaseInitialized(val);
			} else {
				setfirebaseInitialized(false);
			}
		});
	});

	useEffect(() => {
		if (firebaseInitialized && firebaseInitialized !== false) {
			result = firebase.findUser(firebaseInitialized.email);
			result.then(function (res) {
				setUser(res);
			});
		}
	}, [firebaseInitialized]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircle />
				</Avatar>
				<Typography component="h1" variant="h5">
					User Profile
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						inputProps={{
							readOnly: true,
							disabled: true,
						}}
						label="Username"
						variant="outlined"
						margin="normal"
						fullWidth
						id="username"
						name="username"
						value={user ? user.user_name : username}
					/>

					<TextField
						inputProps={{
							readOnly: true,
							disabled: true,
						}}
						variant="outlined"
						margin="normal"
						fullWidth
						label="Email Address"
						name="email"
						type="email"
						id="email"
						value={user ? user.user_email : email}
					/>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

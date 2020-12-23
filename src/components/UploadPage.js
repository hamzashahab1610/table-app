import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloudinaryUploader from "./CloudinaryUploader";
import api from "../api/api";

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
	select: {
		width: "100%",
		marginTop: "1rem",
		marginBottom: "1rem",
	},
	label: {
		marginTop: "1rem",
	},
}));

export default function Upload({ format }) {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [option, setOption] = useState("");
	const [companies, setCompanies] = useState("");

	const handleChange = (event) => {
		setOption(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (format === "image") {
			api.post("/images", {
				name: name,
				url: url,
				description: description,
				type: type,
				option: option,
			})
				.then((res) => {
					console.log("res", res);
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		if (format === "file") {
			api.post("/files", {
				name: name,
				url: url,
				description: description,
				type: type,
			})
				.then((res) => {
					console.log("res", res);
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		if (format === "video") {
			api.post("/videos", {
				name: name,
				url: url,
				companies: companies,
			})
				.then((res) => {
					console.log("res", res);
				})
				.catch((error) => {
					console.log("error", error);
				});
		}

		window.location.reload(false);
	};

	console.log("url", url);
	console.log("type", type);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{/* <Typography component="h1" variant="h5">
					Upload
				</Typography> */}
				<CloudinaryUploader
					setUrl={setUrl}
					//setType={setType}
					setName={setName}
				/>
				<form
					onSubmit={(e) => handleSubmit(e)}
					className={classes.form}
					noValidate
				>
					{(format === "image" || format === "file") && (
						<>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoFocus
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="type"
								label="Type"
								name="type"
								autoFocus
								value={type}
								onChange={(e) => setType(e.target.value)}
							/>
						</>
					)}

					{format === "image" && (
						<>
							<InputLabel className={classes.label} id="option">
								Option
							</InputLabel>
							<Select
								labelId="option"
								id="option"
								value={option}
								onChange={handleChange}
								className={classes.select}
							>
								<MenuItem value={"Character"}>
									Character
								</MenuItem>
								<MenuItem value={"UI"}>UI</MenuItem>
							</Select>
						</>
					)}

					{format === "video" && (
						<>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="companies"
								label="Companies"
								name="companies"
								autoFocus
								value={companies}
								onChange={(e) => setCompanies(e.target.value)}
							/>
						</>
					)}

					{/* <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="type"
						label="Type"
						id="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
					/> */}
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
}

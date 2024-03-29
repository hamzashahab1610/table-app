import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import api from "../api/api";

import firebase from "./firebase";

import "./table.css";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => (
		<ArrowDownward {...props} ref={ref} />
	)),
	ThirdStateCheck: forwardRef((props, ref) => (
		<Remove {...props} ref={ref} />
	)),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// function validateEmail(email) {
// 	const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
// 	return re.test(String(email).toLowerCase());
// }

function Table() {
	const history = useHistory();
	var result;
	var email;
	var password;

	var columns = [
		{ title: "Name", field: "user_name" },
		{ title: "Email", field: "user_email" },
		{ title: "Password", field: "user_password" },
		{
			title: "Role",
			field: "user_role",
			lookup: {
				Keyword_Analyst: "Keyword Analyst",
				Market_Analyst: "Market Analyst",
				Leads_Analyst: "Leads Analyst",
			},
		},
	];
	const [data, setData] = useState([]); //table data

	//for error handling
	const [iserror, setIserror] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);
	const [user, setUser] = useState();
	const [firebaseInitialized, setfirebaseInitialized] = useState();

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

	console.log(user);
	if (user) {
		email = user.user_email;
		password = user.user_password;
	}

	useEffect(() => {
		if (firebaseInitialized === false) {
			history.push("/signin");
		}
	}, []);

	useEffect(() => {
		api.get("/users")
			.then((res) => {
				setData(res.data);
			})
			.catch((error) => {
				console.log("Error");
			});
	}, []);

	const handleRowUpdate = (newData, oldData, resolve) => {
		//validation
		let errorList = [];
		if (newData.user_name === "") {
			errorList.push("Please enter name");
		}
		if (newData.user_email === "") {
			errorList.push("Please enter email");
		}
		if (newData.user_password === "") {
			errorList.push("Please enter password");
		}
		if (newData.user_role === "") {
			errorList.push("Please enter role");
		}

		if (errorList.length < 1) {
			api.patch("/users/" + newData._id, newData)
				.then((res) => {
					const dataUpdate = [...data];
					const index = oldData.tableData._id;
					dataUpdate[index] = newData;
					setData([...dataUpdate]);
					resolve();
					window.location.reload(false);
					setIserror(false);
					setErrorMessages([]);
				})
				.catch((error) => {
					setErrorMessages(["Update failed! Server error"]);
					setIserror(true);
					resolve();
				});
		} else {
			setErrorMessages(errorList);
			setIserror(true);
			resolve();
		}
	};

	const handleRowAdd = (newData, resolve) => {
		//validation
		let errorList = [];
		if (newData.user_name === undefined) {
			errorList.push("Please enter name");
		}
		if (newData.user_email === undefined) {
			errorList.push("Please enter email");
		}
		if (newData.user_password === undefined) {
			errorList.push("Please enter password");
		}
		if (newData.user_role === undefined) {
			errorList.push("Please enter role");
		}

		if (errorList.length < 1) {
			const result = firebase
				.register(
					newData.user_name,
					newData.user_email,
					newData.user_password,
					newData.user_role,
				)
				.then((res) => {
					setErrorMessages([]);
					setIserror(false);

					if (user.user_role === "owner") {
						firebase.login(email, password);
					}

					firebase.createProfile(
						newData.user_name,
						newData.user_email,
						newData.user_password,
						newData.user_role,
						res.user.uid,
					);

					api.post("/users", newData)
						.then((res) => {
							let dataToAdd = [...data];
							dataToAdd.push(newData);
							setData(dataToAdd);
							resolve();
							//window.location.reload(false);
							setErrorMessages([]);
							setIserror(false);
						})
						.catch((error) => {
							setErrorMessages([
								"Cannot add data. Server error!",
							]);
							setIserror(true);
							resolve();
						});
				})
				.catch((error) => {
					setErrorMessages([`${error}`]);
					setIserror(true);
					resolve();
				});
			// result.then(function (res) {
			// 	console.log("result", res);
			// 	firebase.createProfile(
			// 		newData.user_name,
			// 		newData.user_email,
			// 		newData.user_password,
			// 		newData.user_role,
			// 		res.user.uid,
			// 	);
			// });
			//no error
		} else {
			setErrorMessages(errorList);
			setIserror(true);
			resolve();
		}
	};

	const handleRowDelete = (oldData, resolve) => {
		api.delete("/users/" + oldData._id)
			.then((res) => {
				const dataDelete = [...data];
				const index = oldData.tableData._id;
				var x = dataDelete.filter((item) => item._id !== index);
				//dataDelete.splice(index, 1);
				setData([...x]);
				resolve();
				window.location.reload(false);
			})
			.catch((error) => {
				setErrorMessages(["Delete failed! Server error"]);
				setIserror(true);
				resolve();
			});
	};

	return (
		<div className="table">
			<Grid container spacing={1}>
				{/* <Grid item xs={3}></Grid> */}
				<Grid item xs={12}>
					<div>
						{iserror && (
							<Alert severity="error">
								{errorMessages.map((msg, i) => {
									return <div key={i}>{msg}</div>;
								})}
							</Alert>
						)}
					</div>
					<MaterialTable
						title="Users Table"
						columns={columns}
						data={data}
						icons={tableIcons}
						editable={{
							// onRowUpdate: (newData, oldData) =>
							// 	new Promise((resolve) => {
							// 		handleRowUpdate(newData, oldData, resolve);
							// 	}),
							onRowAdd: (newData) =>
								new Promise((resolve) => {
									handleRowAdd(newData, resolve);
								}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									handleRowDelete(oldData, resolve);
								}),
						}}
						options={{
							actionsColumnIndex: -1,
							exportButton: true,
						}}
					/>
				</Grid>
				{/* <Grid item xs={3}></Grid> */}
			</Grid>
		</div>
	);
}

export default Table;

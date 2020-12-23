import React, { useState, useEffect, forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import OpenInNew from "@material-ui/icons/OpenInNew";
import Save from "@material-ui/icons/Save";
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

import "./table.css";
import Modal from "./Modal";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	OpenInNew: forwardRef((props, ref) => <OpenInNew {...props} ref={ref} />),
	Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
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

function Table({ format }) {
	var columns = [
		{ title: "Video", field: "video" },
		{ title: "Companies", field: "companies" },
	];
	const [data, setData] = useState([]); //table data
	const [upload, setUpload] = useState(false);

	//for error handling
	const [iserror, setIserror] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);

	useEffect(() => {
		api.get("/videos")
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
		if (newData.vc_name === "") {
			errorList.push("Please enter VC Name");
		}
		if (newData.company === "") {
			errorList.push("Please enter company");
		}
		if (newData.market === "") {
			errorList.push("Please enter market");
		}
		if (newData.date === "") {
			errorList.push("Please enter date");
		}
		if (newData.amount === "") {
			errorList.push("Please enter amount");
		}
		if (newData.round === "") {
			errorList.push("Please enter round");
		}

		if (errorList.length < 1) {
			api.patch("/videos/" + newData._id, newData)
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
		if (newData.vc_name === undefined) {
			errorList.push("Please enter VC Name");
		}
		if (newData.company === undefined) {
			errorList.push("Please enter company");
		}
		if (newData.market === undefined) {
			errorList.push("Please enter market");
		}
		if (newData.date === undefined) {
			errorList.push("Please enter date");
		}
		if (newData.amount === undefined) {
			errorList.push("Please enter amount");
		}
		if (newData.round === undefined) {
			errorList.push("Please enter round");
		}

		if (errorList.length < 1) {
			//no error
			api.post("/videos", newData)
				.then((res) => {
					let dataToAdd = [...data];
					dataToAdd.push(newData);
					setData(dataToAdd);
					resolve();
					window.location.reload(false);
					setErrorMessages([]);
					setIserror(false);
				})
				.catch((error) => {
					setErrorMessages(["Cannot add data. Server error!"]);
					setIserror(true);
					resolve();
				});
		} else {
			setErrorMessages(errorList);
			setIserror(true);
			resolve();
		}
	};

	const handleRowDelete = (oldData, resolve) => {
		api.delete("/videos/" + oldData._id)
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
			{upload && (
				<Modal setUpload={setUpload} upload={upload} format={format} />
			)}
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
						title="Video Table"
						columns={columns}
						data={data}
						icons={tableIcons}
						editable={{
							// onRowUpdate: (newData, oldData) =>
							// 	new Promise((resolve) => {
							// 		handleRowUpdate(newData, oldData, resolve);
							// 	}),
							// onRowAdd: (newData) =>
							// 	new Promise((resolve) => {
							// 		handleRowAdd(newData, resolve);
							// 	}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									handleRowDelete(oldData, resolve);
								}),
						}}
						actions={[
							{
								icon: OpenInNew,
								tooltip: "Open Link",
								onClick: (event, rowData) => {
									console.log("data", rowData);
									window.location.href = rowData.video_url;
								},
							},
							{
								icon: AddBox,
								tooltip: "Add User",
								isFreeAction: true,
								onClick: (event) => setUpload(true),
							},
						]}
						options={{
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import UploadPage from "./UploadPage";

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		width: "90%",
		height: "90%",
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		backgroundColor: "white",
	},
}));

export default function SimpleModal({ setUpload, upload, format }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setUpload(true);
	};

	const handleClose = () => {
		setUpload(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<UploadPage format={format} />
		</div>
	);

	return (
		<div>
			<Modal
				open={upload}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}

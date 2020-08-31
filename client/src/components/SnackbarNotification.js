import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

export default function SnackbarNotification({ message }) {
	const [open, setOpen] = React.useState(true);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	let colour;
	let severity;
	if (message.indexOf("success") !== -1) {
		colour = "rgb(10, 124, 10)";
		severity = "success";
	} else if (message.indexOf("fail") !== -1) {
		colour = "rgb(143, 27, 27)";
		severity = "fail";
	} else {
		colour = "rgb(0, 124, 124)";
		severity = "neutral";
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			className={`snackNotification-${severity}`}
			open={open}
			autoHideDuration={2000}
			onClose={handleClose}
			data-test="component-snackbar"
		>
			<SnackbarContent
				style={{
					border: `6px solid ${colour}`,
					fontWeight: 500,
				}}
				message={message}
			/>
		</Snackbar>
	);
}

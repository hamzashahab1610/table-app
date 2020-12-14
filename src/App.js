import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";

import MarketTable from "./components/MarketTable";
import CompanyTable from "./components/CompanyTable";
import KeywordTable from "./components/KeywordTable";
import KeywordCountTable from "./components/KeywordCountTable";
import ModelTable from "./components/ModelTable";
import ShellTable from "./components/ShellTable";
import AppTable from "./components/AppTable";
import AdTable from "./components/AdTable";
import VcTable from "./components/VcTable";
import FundingTable from "./components/FundingTable";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import api from "./api/api";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function App() {
	const [companies, setCompanies] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		api.get("/companies")
			.then((res) => {
				setCompanies(res.data);
			})
			.catch((error) => {
				console.log("Error");
			});
	}, []);

	return (
		<div className="App">
			<Router>
				<div>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
							<Link
								to="/"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Companies</Button>
							</Link>
							<Link
								to="/markets"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Markets</Button>
							</Link>
							<Link
								to="/keywords"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Keywords</Button>
							</Link>
							<Link
								to="/keyword_count"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Keyword Count</Button>
							</Link>
							<Link
								to="/apps"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Apps</Button>
							</Link>
							<Link
								to="/models"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Models</Button>
							</Link>
							<Link
								to="/shells"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Shells</Button>
							</Link>
							<Link
								to="/ads"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Ads</Button>
							</Link>
							<Link
								to="/vcs"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">VCs</Button>
							</Link>
							<Link
								to="/fundings"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<Button color="inherit">Fundings</Button>
							</Link>
						</Toolbar>
					</AppBar>

					<Switch>
						<Route path="/markets">
							<MarketTable companies={companies} />
						</Route>
						<Route path="/keywords">
							<KeywordTable companies={companies} />
						</Route>
						<Route path="/apps">
							<AppTable companies={companies} />
						</Route>
						<Route path="/shells">
							<ShellTable companies={companies} />
						</Route>
						<Route path="/models">
							<ModelTable companies={companies} />
						</Route>
						<Route path="/ads">
							<AdTable companies={companies} />
						</Route>
						<Route path="/vcs">
							<VcTable companies={companies} />
						</Route>
						<Route path="/fundings">
							<FundingTable companies={companies} />
						</Route>
						<Route path="/keyword_count">
							<KeywordCountTable companies={companies} />
						</Route>
						<Route path="/">
							<CompanyTable />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;

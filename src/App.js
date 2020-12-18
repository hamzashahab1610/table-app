import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
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
import UserTable from "./components/UserTable";
import NeuralProjectTable from "./components/NeuralProjectTable";
import LeadTable from "./components/LeadTable";
import SupplierTable from "./components/SupplierTable";
import PricingTable from "./components/PricingTable";
import FeatureTable from "./components/FeatureTable";
import QuestionTable from "./components/QuestionTable";
import TermTable from "./components/TermTable";
import ToolTable from "./components/ToolTable";
import NameIdeaTable from "./components/NameIdeaTable";
import JobTable from "./components/JobTable";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation,
	useHistory,
} from "react-router-dom";

import api from "./api/api";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import firebase from "./components/firebase";

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
	const history = useHistory();
	const [companies, setCompanies] = useState([]);
	const classes = useStyles();
	const location = useLocation();
	const [user, setUser] = useState();
	const [firebaseInitialized, setfirebaseInitialized] = useState();
	var result;

	useEffect(() => {
		api.get("/companies")
			.then((res) => {
				setCompanies(res.data);
			})
			.catch((error) => {
				console.log("Error");
			});
	}, []);

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

	useEffect(() => {
		if (firebaseInitialized === false) {
			history.push("/signin");
		}
	}, []);

	const handleLogout = () => {
		history.push("/signin");
		firebase.logout();
	};

	return (
		<div className="App">
			<div>
				{location &&
				location.pathname !== "/signin" &&
				location.pathname !== "/signup" &&
				user !== undefined &&
				user.user_role === "Keyword_Analyst" ? (
					<AppBar position="static">
						<Toolbar>
							<Grid
								justify="space-between"
								alignItems="center"
								container
								spacing={24}
							>
								<Grid item>
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
										<Button color="inherit">
											Companies
										</Button>
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
										to="/keywords"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Keywords
										</Button>
									</Link>
									<Link
										to="/keyword_count"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Keyword Count
										</Button>
									</Link>
								</Grid>
								<Grid item>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											onClick={handleLogout}
											color="inherit"
										>
											Log Out
										</Button>
									</Link>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				) : user !== undefined &&
				  user.user_role === "Market_Analyst" ? (
					<AppBar position="static">
						<Toolbar>
							<Grid
								justify="space-between"
								alignItems="center"
								container
								spacing={24}
							>
								<Grid item>
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
										<Button color="inherit">
											Companies
										</Button>
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
										<Button color="inherit">
											Keywords
										</Button>
									</Link>
									<Link
										to="/keyword_count"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Keyword Count
										</Button>
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
										<Button color="inherit">
											Fundings
										</Button>
									</Link>
								</Grid>
								<Grid item>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											onClick={handleLogout}
											color="inherit"
										>
											Log Out
										</Button>
									</Link>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				) : (
					<AppBar position="static">
						<Toolbar>
							<Grid
								justify="space-between"
								alignItems="center"
								container
								spacing={24}
							>
								<Grid item>
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
										<Button color="inherit">
											Companies
										</Button>
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
										<Button color="inherit">
											Keywords
										</Button>
									</Link>
									<Link
										to="/keyword_count"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Keyword Count
										</Button>
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
										<Button color="inherit">
											Fundings
										</Button>
									</Link>
									<Link
										to="/users"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Users</Button>
									</Link>
									<Link
										to="/neural_projects"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Neural Projects
										</Button>
									</Link>
									<Link
										to="/leads"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Leads</Button>
									</Link>
									<Link
										to="/suppliers"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Suppliers
										</Button>
									</Link>
									<Link
										to="/pricing"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Pricing</Button>
									</Link>
									<Link
										to="/feature"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Features
										</Button>
									</Link>
									<Link
										to="/questions"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Questions
										</Button>
									</Link>
									<Link
										to="/terms"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Terms</Button>
									</Link>
									<Link
										to="/tools"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Tools</Button>
									</Link>
									<Link
										to="/name_ideas"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">
											Name Ideas
										</Button>
									</Link>
									<Link
										to="/jobs"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button color="inherit">Jobs</Button>
									</Link>
								</Grid>
								<Grid item>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											onClick={handleLogout}
											color="inherit"
										>
											Log Out
										</Button>
									</Link>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				)}

				<Switch>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/users">
						<UserTable />
					</Route>
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
					<Route path="/neural_projects">
						<NeuralProjectTable />
					</Route>
					<Route path="/suppliers">
						<SupplierTable />
					</Route>
					<Route path="/leads">
						<LeadTable />
					</Route>
					<Route path="/pricing">
						<PricingTable />
					</Route>
					<Route path="/name_idea">
						<NameIdeaTable />
					</Route>
					<Route path="/jobs">
						<JobTable />
					</Route>
					<Route path="/features">
						<FeatureTable />
					</Route>
					<Route path="/questions">
						<QuestionTable />
					</Route>
					<Route path="/terms">
						<TermTable />
					</Route>
					<Route path="/tools">
						<ToolTable />
					</Route>
					<Route path="/">
						<CompanyTable />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;

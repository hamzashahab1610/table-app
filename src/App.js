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
import IntegrationTable from "./components/IntegrationTable";
import AdonTable from "./components/AdonTable";
import NewsTable from "./components/NewsTable";
import ImageTable from "./components/ImageTable";
import FileTable from "./components/FileTable";
import VideoTable from "./components/VideoTable";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
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
		textTransform: "lowercase",
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
									{/* <IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="menu"
									>
										<MenuIcon />
									</IconButton> */}
									<NavLink
										activeClassName="active-link"
										to="/companies"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											companies
										</Button>
									</NavLink>

									<NavLink
										activeClassName="active-link"
										to="/ads"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											displayAds
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/keywords"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											keywords
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/keyword_count"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											keywordCount
										</Button>
									</NavLink>
								</Grid>
								<Grid item style={{ width: "5rem" }}>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
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
				) : location &&
				  location.pathname !== "/signin" &&
				  location.pathname !== "/signup" &&
				  user !== undefined &&
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
									{/* <IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="menu"
									>
										<MenuIcon />
									</IconButton> */}
									<NavLink
										activeClassName="active-link"
										to="/companies"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											companies
										</Button>
									</NavLink>

									<NavLink
										activeClassName="active-link"
										to="/markets"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											markets
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/keywords"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											keywords
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/keyword_count"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											keywordCount
										</Button>
									</NavLink>

									<NavLink
										activeClassName="active-link"
										to="/ads"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											displayAds
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/vcs"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											vcs
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/fundings"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											fundings
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/pricing"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											pricing
										</Button>
									</NavLink>
									<NavLink
										activeClassName="active-link"
										to="/features"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											features
										</Button>
									</NavLink>
								</Grid>
								<Grid item style={{ width: "5rem" }}>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
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
				) : location &&
				  location.pathname !== "/signin" &&
				  location.pathname !== "/signup" &&
				  user !== undefined &&
				  user.user_role === "Leads_Analyst" ? (
					<AppBar position="static">
						<Toolbar>
							<Grid
								justify="space-between"
								alignItems="center"
								container
								spacing={24}
							>
								<Grid item>
									{/* <IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="menu"
									>
										<MenuIcon />
									</IconButton> */}
									<NavLink
										activeClassName="active-link"
										to="/leads"
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
											color="inherit"
										>
											leads
										</Button>
									</NavLink>
								</Grid>
								<Grid item style={{ width: "5rem" }}>
									<Link
										style={{
											textDecoration: "none",
											color: "white",
										}}
									>
										<Button
											style={{
												textTransform: "initial",
											}}
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
					location &&
					location.pathname !== "/signin" &&
					location.pathname !== "/signup" && (
						<AppBar position="static">
							<Toolbar>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Grid
										justify="space-between"
										alignItems="center"
										container
										spacing={0}
										className={classes.title}
									>
										<Grid item>
											{/* <IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="menu"
									>
										<MenuIcon />
									</IconButton> */}
											<NavLink
												activeClassName="active-link"
												to="/companies"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													color="inherit"
													className="item"
													style={{
														textTransform:
															"initial",
													}}
												>
													companies
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/topPlayers"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													color="inherit"
													className="item"
													style={{
														textTransform:
															"initial",
													}}
												>
													topPlayers
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/markets"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													color="inherit"
													style={{
														textTransform:
															"initial",
													}}
												>
													markets
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/keywords"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													keywords
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/keyword_count"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													keywordCount
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/apps"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													apps
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/models"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													models
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/shells"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													shells
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/ads"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													displayAds
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/vcs"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													vcs
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/fundings"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													fundings
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/users"
												style={{
													textDecoration: "none",

													color: "white",
												}}
											>
												<Button
													color="inherit"
													style={{
														textTransform:
															"initial",
													}}
												>
													users
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/neural_projects"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													neuralProjects
												</Button>
											</NavLink>
										</Grid>
										<Grid item>
											<NavLink
												activeClassName="active-link"
												to="/leads"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													leads
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/suppliers"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													suppliers
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/pricing"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													pricing
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/feature"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													features
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/questions"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													questions
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/terms"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													terms
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/tools"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													tools
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/name_ideas"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													nameIdeas
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/jobs"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													jobs
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/integrations"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													integrations
												</Button>
											</NavLink>{" "}
											<NavLink
												activeClassName="active-link"
												to="/adons"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													adOns
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/new"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													news
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/images"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													images
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/files"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													files
												</Button>
											</NavLink>
											<NavLink
												activeClassName="active-link"
												to="/videos"
												style={{
													textDecoration: "none",
													color: "white",
												}}
											>
												<Button
													style={{
														textTransform:
															"initial",
													}}
													color="inherit"
												>
													videos
												</Button>
											</NavLink>
										</Grid>
									</Grid>

									<Grid style={{ width: "5rem" }}>
										<Link
											style={{
												textDecoration: "none",
												color: "white",
											}}
										>
											<Button
												style={{
													textTransform: "initial",
												}}
												onClick={handleLogout}
												color="inherit"
											>
												Log Out
											</Button>
										</Link>
									</Grid>
								</div>
							</Toolbar>
						</AppBar>
					)
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
					<Route path="/integrations">
						<IntegrationTable />
					</Route>
					<Route path="/adons">
						<AdonTable />
					</Route>
					<Route path="/news">
						<NewsTable />
					</Route>
					<Route path="/images">
						<ImageTable format="image" />
					</Route>
					<Route path="/videos">
						<VideoTable format="video" />
					</Route>
					<Route path="/files">
						<FileTable format="file" />
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
						<KeywordCountTable user={user} />
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
					<Route path="/companies">
						<CompanyTable topPlayer={false} />
					</Route>
					<Route path="/topPlayers">
						<CompanyTable topPlayer={true} />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;

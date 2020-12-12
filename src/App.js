import React from "react";
import "./App.css";
import MarketTable from "./components/MarketTable";
import CompanyTable from "./components/CompanyTable";

function App() {
	return (
		<div className="App">
			<h1>Tables App</h1>
			<MarketTable />
			<CompanyTable />
		</div>
	);
}

export default App;

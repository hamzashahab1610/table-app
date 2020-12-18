import React from "react";
import app from "firebase/app";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase-firestore";
import { Redirect } from "react-router-dom";

const config = {
	apiKey: "AIzaSyD4XmQJ-ktvr5HbwtX5_rIGzVGQLWYpLSY",
	authDomain: "react-table-app.firebaseapp.com",
	projectId: "react-table-app",
	storageBucket: "react-table-app.appspot.com",
	messagingSenderId: "256308264854",
	appId: "1:256308264854:web:7a34d9b0a9cb99eded67b7",
};

class Firebase {
	constructor() {
		// if (typeof window !== "undefined") {
		// 	if (!firebase.apps.length) {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		// 	}
		// }
	}

	isInitialized() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve);
		});
	}

	async login(email, password) {
		await this.auth
			.signInWithEmailAndPassword(email, password)
			.then(function (result) {
				console.log(result);
				console.log("Success. User Logged In");
			});
	}

	logout() {
		return this.auth.signOut();
	}

	async register(name, email, password) {
		await this.auth
			.createUserWithEmailAndPassword(email, password)
			.then(function (result) {
				console.log(result);
				console.log("Success. User registered");
				//navigate("/");
			});
		return this.auth.currentUser.updateProfile({
			displayName: name,
		});
	}
}

export default new Firebase();

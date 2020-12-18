import React from "react";
import app from "firebase/app";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase-firestore";

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
		if (typeof window !== "undefined") {
			// 	if (!firebase.apps.length) {
			app.initializeApp(config);
			this.auth = app.auth();

			this.db = app.firestore();
			this.createProfile = this.createProfile.bind(this);
			// 	}
		}
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

	createProfile = (user_name, user_email, user_password, user_role, uid) => {
		return this.db
			.collection("users")
			.doc(uid)
			.set({
				user_name,
				user_email,
				user_password,
				user_role,
			})
			.catch(console.error);
	};

	deleteProfile = (uid) => {
		this.db
			.collection("users")
			.doc(uid)
			.delete()
			.then(function () {
				console.log("Document successfully deleted!");
			})
			.catch(function (error) {
				console.error("Error removing document: ", error);
			});
	};

	async findUser(email) {
		var collection = this.db.collection("users");

		const result = await collection.where("user_email", "==", email).get();
		if (result.empty) {
			console.log("No matching documents.");
			return;
		}
		//console.log("result", result.docs[0].id);
		return result.docs[0].data();
		// result.forEach((doc) => {
		// 	console.log(doc.id, "=>", doc.data());
		// });
	}

	async register(name, email, password, role) {
		var result = await this.auth
			.createUserWithEmailAndPassword(email, password)
			.then(function (result) {
				//console.log(result);
				return result;
			});
		return result;
		// return this.auth.currentUser.updateProfile({
		// 	displayName: name,
		// });
	}
}

export default new Firebase();

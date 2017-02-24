// Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyBkXA9wzCqre3KcmzBeT1w3sJZGKjnhIMQ",
    	authDomain: "mi-mascota-e1ce9.firebaseapp.com",
    	databaseURL: "https://mi-mascota-e1ce9.firebaseio.com",
    	storageBucket: "mi-mascota-e1ce9.appspot.com",
    	messagingSenderId: "46558092534"
  	};
  	firebase.initializeApp(config);

	var admin = require("firebase-admin");

	var serviceAccount = require("Mi-Mascota/mi-mascota-e1ce9-firebase-adminsdk-9wb98-1e66eacf9c.json");

	admin.initializeApp({
  		credential: admin.credential.cert(serviceAccount),
  		databaseURL: "https://mi-mascota-e1ce9.firebaseio.com"
	});
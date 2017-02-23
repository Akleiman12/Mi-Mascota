function login(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	console.log("HALOS");

	firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
	  	// Handle Errors here
		console.log(error);
	}).then(function(){
		
	})
	var usuario = firebase.auth().currentUser.uid;
	console.log(usuario);
	window.location = "/index.html";
	}
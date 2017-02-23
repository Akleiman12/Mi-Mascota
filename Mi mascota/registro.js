function registro(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var nombre = document.getElementById("nombre").value;
	console.log("HALOS");

	firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
	  	// Handle Errors here.
	  	var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
	    	alert('The password is too weak.');
		} else {
	    	alert(errorMessage);
		}
		console.log(error);
	}).then(function(){

	})

	window.location = "/index.html";
}
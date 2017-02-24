function registro(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var nombre = document.getElementById("nombre").value;

	//creacion de usuario.
	firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
		var user = firebase.auth().currentUser;


		//acceso a la base de datos.
		firebase.database().ref('users/'+user.uid).set({
			nombre: nombre,
			email: email,
			id: user.uid
		}).then(function(){
			window.location = "/";
		}).catch(function(error){
			alert(error.code);
		});
	}).catch(function(error) {
	  	// Manejo de errores.
	  	var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
	    	alert('The password is too weak.');
		} else {
	    	alert(errorMessage);
		}
	});
}
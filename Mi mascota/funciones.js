firebase.auth().onAuthStateChanged(function(user){
	if(user){
		$("#signin").hide();
		console.log("oculte signin");
		$("#signout").show();
		console.log("mostre signout");
		$(".pantallaLogin").hide();
		$(".pantallaRegistro").hide();
		$("#register").hide();
	}
	else{
		$("#signin").show();
		$("#signout").hide();
		$("#register").show();
	}
})

function muestraLogin(){
	$(".pantallaLogin").show();
}

function ocultaLogin(){
	$(".pantallaLogin").hide();
}

function muestraRegistro(){
	$(".pantallaRegistro").show();
}

function ocultaRegistro(){
	$(".pantallaRegistro").hide();
}

function login(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	console.log("HALOS");
	if(email!="" && password!=""){
		$("#loginSpinner").show();
		$("#loginBtn").hide();
		firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
	  		$("#loginError").show().text(error.message);
	  		$("#loginSpinner").hide();
			$("#loginBtn").show();
	  	}).then(function(){

	});
	}
	else{
	alert("Debes llenar los campos necesarios");
	}
	}

function signout(){
	firebase.auth().signOut().then(function() {
  		$("#signin").show();
		$("#signout").hide();
	}, function(error) {
 	    console.log("No se realizo signout");
	});
}

function registro(){
	var correo = $("#correo").val();
	var contra = $("#contra").val();
	var nombre = $("#nombre").val();
	if(correo!="" && contra!=""){
		$("#registroSpinner").show();
		$("#registroBtn").hide();
		firebase.auth().createUserWithEmailAndPassword(correo, contra).catch(function(error) {
  			// Handle Errors here.  
  			var errorMessage = error.message;
  			alert(errorMessage);
  			console.log(error);
		}).then(function(){
			var usuario = firebase.auth().currentUser;
			firebase.database().ref('users/' + usuario.uid).set({
			    nombre: name,
			    email: email
			});
		});

	}
	else{
		alert("Debes llenar los campos necesarios");
	}

}

function registro_login(){
		console.log("entre en la funcion");
		$(".pantallaLogin").hide();
		console.log("oculte Login");
		$(".pantallaRegistro").show();
		console.log("mostre Registro");
}

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		$(".pantallaLogin").hide();
		$("#signin").hide();
		$("#signout").show();
	}
	else{
		$("#signin").show();
		$("#signout").hide();
	}
})

function muestraLogin(){
	$(".pantallaLogin").show();
}

function ocultaLogin(){
	$(".pantallaLogin").hide();
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

	})
	}
	else{
	alert("Debes llenar los campos necesarios");
	}
	}
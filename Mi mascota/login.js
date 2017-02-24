firebase.auth().onAuthStateChanged(function(user){
	if(user){
		$("#signin").hide();
		console.log("oculte signin");
		$("#signout").show();
		console.log("mostre signout");
		$(".pantallaLogin").hide();
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

	});
	}
	else{
	alert("Debes llenar los campos necesarios");
	}
	}

	function signout(){
		firebase.auth().signOut().then(function(){
			$("#signin").show();
			$("#signout").hide();
		}, function(error) {
  			console.error('Sign Out Error', error);
		});
	}
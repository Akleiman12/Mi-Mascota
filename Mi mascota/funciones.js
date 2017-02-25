    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var id= getParameterByName('userID');

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		var uid = user.uid;
		console.log(uid);
		var referencia = firebase.database().ref("users/"+uid);
		referencia.once("value").then(function(snapshot) {
			var administrador = snapshot.child("admin").val();
			console.log(administrador);
			if(administrador){
				$("#adminView").show();
				$("#mainPerfil").show();
				$("#tablaUsuarios").show();
				$("#calificarBtn").show();
				$("#rechazarBtn").show();
				$("#requestBtn").show();

			} else{
				$("#adminView").hide();
				$("#mainPerfil").hide();
				$("#tablaUsuarios").hide();
			}

		if(user.uid == id){
			$("#editarBtn").show();
			$("#editarBtn2").show();
		}
		});
		$("#signin").hide();
		$("#signout").show();	
		$(".pantallaLogin").hide();
		$(".pantallaRegistro").hide();
		$("#register").hide();
		

	}
	else{
		$("#signin").show();
		$("#signout").hide();
		$("#register").show();
		$("#adminView").hide();
		$("#tablaUsuarios").hide();
		$("#mainPerfil").hide();
	}
});

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
		$("#adminView").hide();
		$("#perfil").hide();
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
  			$("#registroSpinner").hide();
			$("#registroBtn").show();
		}).then(function(){
			var usuario = firebase.auth().currentUser;
			firebase.database().ref('users/' + usuario.uid).set({
			    nombre: nombre,
			    email: correo,
			    id: usuario.uid
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

function calificar(){
	firebase.database().ref("users/"+id).update({
				calificar: true,
			});

}

function editar(){
	$("#info").show();
}

function editar2(){
	$("#info2").show();
}
function ocultaInfo(){
	$("#info").hide();
}


function ocultaInfo2(){
	$("#info2").hide();
}
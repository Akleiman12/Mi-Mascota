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
	  		location.reload();
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
		location.reload();
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
				rechazar: false,
				existeRequest: false
			}).then(function(){
				alert("Usuario calificado");
				location.reload();
			});


}

function rechazar(){
	firebase.database().ref("users/"+id).update({
				calificar: false,
				rechazar: true,
				existeRequest: false
			}).then(function(){
				alert("Usuario rechazado");
				location.reload();
			});;
}

function request(){
	$("#requestCambio").show();

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

function ocultaRequest(){
	$("#requestCambio").hide();
}


function enviarRequest(){
		var cambio = document.getElementById("descripcionCambios").value;
		if(cambio!=""){
			$("#requestBtn").hide();
			$("#requestSpinner").show();

			firebase.database().ref("users/"+id).update({
				calificar: false,
				rechazar: false,
				request: cambio,
				existeRequest: true
			}).then(function(){
				$("#requestBtn2").show();
				$("#requestSpinner").hide();
				$("#requestCambio").hide();
				alert("Petición hecho satisfactoriamente");
				location.reload();
			}).catch(function(){
				alert("No se ha logrado hacer la petición");
				$("#requestBtn2").show();
				$("#requestSpinner").hide();
			});
		}
		else{
			alert("Recuerde responder a todos los campos");
		}
	}
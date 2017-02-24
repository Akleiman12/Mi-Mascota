function enviarInfo(){
	var user = firebase.auth().currentUser;

	if(user){
		var nombreUser = document.getElementById("nombre").value;
		var apellidoUser = document.getElementById("apellido").value;
		var cedulaUser = document.getElementById("numced").value;
		var telefonoUser = document.getElementById("numtel").value;
		var nombreMascota = document.getElementById("nombrem").value;
		var edadMascota = document.getElementById("edadm").value;
		var historiaMascota = document.getElementById("historiam").value;

		if(nombreUser!="" && apellidoUser!="" && cedulaUser!="" && telefonoUser!="" && nombreMascota!="" && edadMascota!="" && historiaMascota!=""){
			
			$("#infoBtn").hide();
			$("#infoSpinner").show();

			firebase.database().ref("users/"+user.uid).update({
				nombre: nombreUser,
				apellido: apellidoUser,
				cedula: cedulaUser,
				telefono: telefonoUser
			}).then(function(){
				firebase.database().ref("mascota/"+user.uid).set({
					nombre: nombreMascota,
					edad: edadMascota,
					historia: historiaMascota
				}).catch(function(error){
					alert("ERROR.");
					$("#infoBtn").show();
					$("#infoSpinner").hide();
				}).then(function(){
					$("#infoBtn").show();
					$("#infoSpinner").hide();
				});
			}).catch(function(error) {
	  	// Manejo de errores.
	  			alert("ERROR.");
	  			$("#infoBtn").show();
				$("#infoSpinner").hide();
			});
		}else{
			alert("Recuerde llenar todos los campos.");
		}
	}else{
		alert("Debe hacer login para poder ingresar informacion.");

	}
}
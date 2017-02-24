function enviarInfo(){
	var user = firebase.auth().currentUser;

	if(user){
		var nombreUser = document.getElementById("nombre").value;
		var apellidoUser = document.getElementById("nombre").value;
		var cedulaUser = document.getElementById("nombre").value;
		var telefonoUser = document.getElementById("nombre").value;
		var nombreMascota = document.getElementById("nombre").value;
		var edadMascota = document.getElementById("nombre").value;
		var historiaMascota = document.getElementById("nombre").value;

		if(nombreUser!=null && apellidoUser!=null && cedulaUser!=null && telefonoUser!=null && nombreMascota!=null && edadMascota!=null && historiaMascota!=null){
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
				});
			}).catch(function(error) {
	  	// Manejo de errores.
	  			alert("ERROR.");
			});
		}else{
			alert("Recuerde llenar todos los campos.");
		}
	}else{
		alert("Debe hacer login para poder ingresar informacion.");
	}
}
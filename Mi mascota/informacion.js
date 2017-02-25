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
		var img1 = $('#img1').val();
		var img2 = $('#img2').val();
		var img3 = $('#img3').val();
		var file1 = document.getElementById('img1').files[0];
		var file2 = document.getElementById('img2').files[0];
		var file3 = document.getElementById('img3').files[0];


		if(nombreUser!="" && apellidoUser!="" && cedulaUser!="" && telefonoUser!="" && nombreMascota!="" && edadMascota!="" && historiaMascota!="" && img1!="" && img2!="" && img3!=""){
			
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
					
					var storageRef = firebase.storage().ref();

					storageRef.child('images/'+user.uid).delete().catch(function(error){
						console.log("Montando fotos por primera vez");
					})
					
					console.log("creando tasks");
					console.log("creando task1");
					var uploadtask1 = storageRef.child('images/'+user.uid+'/'+file1.name).put(file1);
					console.log("creando task2");
					var uploadtask2 = storageRef.child('images/'+user.uid+'/'+file2.name).put(file2);
					console.log("creando task3");
					var uploadtask3 = storageRef.child('images/'+user.uid+'/'+file3.name).put(file3);
					console.log("final1");
					console.log("upload1");
					
					uploadtask1.on('state_changed', function(snapshot){
						console.log("Cargando1");
					}, function(error){
						alert("ERROR.");
					}, function(){
						var downloadURL = uploadtask1.snapshot.downloadURL;
						console.log("1 uploaded");
						firebase.database().ref("img/"+user.uid).set({
							url1: downloadURL
						})
						console.log("upload2");
						uploadtask2.on('state_changed', function(snapshot){
							console.log("Cargando2");
						}, function(error){
							alert("ERROR.");
						}, function(){
							var downloadURL = uploadtask2.snapshot.downloadURL;
							console.log("2 uploaded");
							firebase.database().ref("img/"+user.uid).update({
								url2: downloadURL
							})

							console.log("upload3");
							uploadtask3.on('state_changed', function(snapshot){
								console.log("Cargando3");
							}, function(error){
								alert("ERROR.");
							}, function(){
								var downloadURL = uploadtask3.snapshot.downloadURL;
								console.log("3 uploaded");
								firebase.database().ref("img/"+user.uid).update({
									url3: downloadURL
								})
							});
						});
					});

					
					$("#infoBtn").show();
					$("#infoSpinner").hide();

					//window.location = "index.html";


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
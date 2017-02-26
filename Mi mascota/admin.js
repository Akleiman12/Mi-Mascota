function mostrarTodos() {
	window.location = "/admin.html"
}

function mostrarAceptados() {


	var query = firebase.database().ref("users").orderByKey();
      var table = $("#tablaUsuarios").val();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            var last=childSnapshot.child("apellido").val();
            var first =childSnapshot.child("nombre").val();
            var ced = childSnapshot.child("cedula").val();
            var id = childSnapshot.child("id").val();
            var aceptado = childSnapshot.child("calificar").val();
            var rechazado = childSnapshot.child("rechazar").val();
            var modificar = childSnapshot.child("existeRequest").val();

            var query2 = firebase.database().ref("mascota/"+id).orderByKey();

            query2.once("value").then(function(snapshot2){
              var nombrem = snapshot2.child("nombre").val();
              var edadm = snapshot2.child("edad").val();
              var historiam = snapshot2.child("historia").val();
              

              console.log(nombre+aceptado+rechazado+modificar);

              if(aceptado==true){
                var newRow = $('<tr><td><p>'+first+'</p></td><td><p>'+last+'</p></td><td><p>'+ced+'</p></td><td><p>'+nombrem+'</p></td><td><i class="material-icons">check</i></td><td><a href="perfil?userID='+id+'">Perfil</a></td></tr>');
              	$("#tablaUsuarios").append(newRow);
              }

              
            });


        });
      });
}

function mostrarRechazados() {


	var query = firebase.database().ref("users").orderByKey();
      var table = $("#tablaUsuarios").val();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            var last=childSnapshot.child("apellido").val();
            var first =childSnapshot.child("nombre").val();
            var ced = childSnapshot.child("cedula").val();
            var id = childSnapshot.child("id").val();
            var aceptado = childSnapshot.child("calificar").val();
            var rechazado = childSnapshot.child("rechazar").val();
            var modificar = childSnapshot.child("existeRequest").val();

            var query2 = firebase.database().ref("mascota/"+id).orderByKey();

            query2.once("value").then(function(snapshot2){
              var nombrem = snapshot2.child("nombre").val();
              var edadm = snapshot2.child("edad").val();
              var historiam = snapshot2.child("historia").val();
              

              console.log(nombre+aceptado+rechazado+modificar);

              if(rechazado==true){
                var newRow = $('<tr><td><p>'+first+'</p></td><td><p>'+last+'</p></td><td><p>'+ced+'</p></td><td><p>'+nombrem+'</p></td><td><i class="material-icons">cancel</i></td><td><a href="perfil?userID='+id+'">Perfil</a></td></tr>');
              	$("#tablaUsuarios").append(newRow);
              }
            });
        });
      });
}

function mostrarPendientes() {


	var query = firebase.database().ref("users").orderByKey();
      var table = $("#tablaUsuarios").val();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            var last=childSnapshot.child("apellido").val();
            var first =childSnapshot.child("nombre").val();
            var ced = childSnapshot.child("cedula").val();
            var id = childSnapshot.child("id").val();
            var aceptado = childSnapshot.child("calificar").val();
            var rechazado = childSnapshot.child("rechazar").val();
            var modificar = childSnapshot.child("existeRequest").val();

            var query2 = firebase.database().ref("mascota/"+id).orderByKey();

            query2.once("value").then(function(snapshot2){
              var nombrem = snapshot2.child("nombre").val();
              var edadm = snapshot2.child("edad").val();
              var historiam = snapshot2.child("historia").val();
              

              console.log(nombre+aceptado+rechazado+modificar);

              if(modificar==true){
                var newRow = $('<tr><td><p>'+first+'</p></td><td><p>'+last+'</p></td><td><p>'+ced+'</p></td><td><p>'+nombrem+'</p></td><td><i class="material-icons">build</i></td><td><a href="perfil?userID='+id+'">Perfil</a></td></tr>');
              	$("#tablaUsuarios").append(newRow);
              }
            });
        });
      });
}

function mostrarRev() {


	var query = firebase.database().ref("users").orderByKey();
      var table = $("#tablaUsuarios").val();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            var last=childSnapshot.child("apellido").val();
            var first =childSnapshot.child("nombre").val();
            var ced = childSnapshot.child("cedula").val();
            var id = childSnapshot.child("id").val();
            var aceptado = childSnapshot.child("calificar").val();
            var rechazado = childSnapshot.child("rechazar").val();
            var modificar = childSnapshot.child("existeRequest").val();

            var query2 = firebase.database().ref("mascota/"+id).orderByKey();

            query2.once("value").then(function(snapshot2){
              var nombrem = snapshot2.child("nombre").val();
              var edadm = snapshot2.child("edad").val();
              var historiam = snapshot2.child("historia").val();
              

              console.log(nombre+aceptado+rechazado+modificar);

              if(rechazado!=true && aceptado!=true && modificar!=true){
                var newRow = $('<tr><td><p>'+first+'</p></td><td><p>'+last+'</p></td><td><p>'+ced+'</p></td><td><p>'+nombrem+'</p></td><td><i class="material-icons">search</i></td><td><a href="perfil?userID='+id+'">Perfil</a></td></tr>');
              	$("#tablaUsuarios").append(newRow);
              }
            });
        });
      });
}
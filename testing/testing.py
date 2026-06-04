function iniciarSesion(usuario, contrasenia) {
2:      if (usuario === "" || contrasenia === "") {
3:          return "Campos vacios";
4:      }
5:      let usuarioExiste = buscarUsuario(usuario); 
6:      if (!usuarioExiste) {
7:          return "Usuario no encontrado";
8:      }
9:      if (usuarioExiste.password === contrasenia) {
10:         return "Login exitoso";
11:     } else {
12:         return "Contraseña incorrecta";
13:     }
14: }
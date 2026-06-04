public class Usuario {
    private String email;
    private String password; // En un entorno real sería el hash, pero lo simplificamos para el test
    private String rol;

    public Usuario(String email, String password, String rol) {
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    // Método principal de negocio para iniciar sesión
    public boolean iniciarSesion(String intentoEmail, String intentoPassword, Usuario[] usuariosRegistrados) {
        for (Usuario u : usuariosRegistrados) {
            if (u != null && u.email.equals(intentoEmail) && u.password.equals(intentoPassword)) {
                return true; // Credenciales correctas, login exitoso
            }
        }
        return false; // No se encontró coincidencia o datos incorrectos
    }
}
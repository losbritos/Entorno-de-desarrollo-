import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class UsuarioTest {

    @Test
    public void testLoginExitoso() {
        // Simulamos la base de datos con un usuario ya registrado
        Usuario[] baseDatosUsuarios = { 
            new Usuario("desarrollador@indie.com", "pass123", "usuario") 
        };

        Usuario sistemaLogin = new Usuario("", "", ""); // Instancia para ejecutar la acción
        
        // Intentamos loguearnos con los datos correctos
        boolean resultado = sistemaLogin.iniciarSesion("desarrollador@indie.com", "pass123", baseDatosUsuarios);
        
        assertTrue(resultado, "El inicio de sesión debería permitir el acceso con credenciales válidas.");
    }

    @Test
    public void testLoginFallidoContrasenaIncorrecta() {
        // Simulamos la base de datos con el usuario registrado
        Usuario[] baseDatosUsuarios = { 
            new Usuario("desarrollador@indie.com", "pass123", "usuario") 
        };

        Usuario sistemaLogin = new Usuario("", "", "");
        
        // Intentamos loguearnos con el email correcto pero contraseña EQUIVOCADA ("passwordErroneo")
        boolean resultado = sistemaLogin.iniciarSesion("desarrollador@indie.com", "passwordErroneo", baseDatosUsuarios);
        
        assertFalse(resultado, "El sistema debería bloquear el inicio de sesión si la contraseña es incorrecta.");
    }
}
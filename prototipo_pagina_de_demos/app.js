// Elements
const authModal = document.getElementById('auth-modal');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');

let isLogin = true;

// Modal Logic
function openAuthModal() {
    authModal.classList.add('show');
}

function closeAuthModal() {
    authModal.classList.remove('show');
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        closeAuthModal();
    }
});

// Switch between Login and Register
function toggleAuthMode() {
    isLogin = !isLogin;

    const submitBtn = authForm.querySelector('button[type="submit"]');
    const switchLink = authForm.querySelector('.auth-switch');

    // Remove existing extra fields if any
    const existingNameField = document.getElementById('name-group');
    if (existingNameField) {
        existingNameField.remove();
    }

    if (isLogin) {
        authTitle.textContent = 'Iniciar Sesión';
        submitBtn.textContent = 'Entrar';
        switchLink.innerHTML = '¿No tienes cuenta? <a href="#" onclick="toggleAuthMode(); return false;">Regístrate</a>';
    } else {
        authTitle.textContent = 'Crear Cuenta';
        submitBtn.textContent = 'Registrarse';
        switchLink.innerHTML = '¿Ya tienes cuenta? <a href="#" onclick="toggleAuthMode(); return false;">Inicia Sesión</a>';

        // Add name field for registration
        const nameGroup = document.createElement('div');
        nameGroup.className = 'input-group';
        nameGroup.id = 'name-group';
        nameGroup.innerHTML = `
            <label for="username">Nombre de Usuario</label>
            <input type="text" id="username" placeholder="Tu nombre en el juego" required>
        `;
        authForm.insertBefore(nameGroup, authForm.children[0]);
    }
}

// Form Submission (Mock)
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log(`Simulando ${isLogin ? 'inicio de sesión' : 'registro'} para:`, email);
    closeAuthModal();
    // Here we would typically change the Navbar to show logged-in state
    updateNavbarLoggedIn();
});

function updateNavbarLoggedIn() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.innerHTML = `
        <a href="#" class="active" onclick="switchView('home-view')">Explorar</a>
        <a href="#" onclick="switchView('admin-view')">Admin</a>
        <a href="#" onclick="switchView('profile-view')"><i class="fa-solid fa-user"></i> Perfil</a>
    `;
}

// Navigation
function switchView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(viewId)) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

function requireLogin() {
    alert("¡Tienes que iniciar sesión para poder jugar a este juego!");
    openAuthModal();
}

function playGame() {
    const title = document.getElementById('detail-title').textContent;
    const heroSection = document.querySelector('.game-detail-hero');
    const bgImage = heroSection.style.backgroundImage;
    
    // Cambiar a la vista de juego y pasar los datos
    const playView = document.getElementById('play-game-view');
    if(playView) {
        document.getElementById('play-title').textContent = title;
        // Extraer la url de la imagen del hero
        const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
        if(urlMatch && urlMatch[1]) {
            playView.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${urlMatch[1]}')`;
        }
        switchView('play-game-view');
    }
}

// Game Interactions
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('liked')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

function openGameDetail(gameName, imageSrc) {
    document.getElementById('detail-title').textContent = gameName;
    const heroSection = document.querySelector('.game-detail-hero');
    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(10,10,15,1)), url('${imageSrc}')`;
    switchView('game-detail-view');
}

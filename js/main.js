// ===================================
// PORTFOLIO JAVASCRIPT
// ===================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();

});

// ===================================
// MODAL DE CONTACTO
// ===================================
function initContactModal() {
    const modal = document.getElementById('contactModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    // Abrir modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            // Pequeño retraso para permitir que display:block se aplique antes de añadir la clase show para la transición
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    // Función cerrar modal
    function closeModal() {
        modal.classList.remove('show');
        // Esperar a que termine la transición antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Cerrar en botón x
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ===================================
// NAVEGACIÓN
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto scroll barra de navegación
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Alternar menú móvil
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Resaltar sección activa en navegación
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// CAMBIO DE TEMA
// ===================================


// ===================================
// ANIMACIONES DE SCROLL
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.reveal');

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// INTERACCIONES TARJETA PROYECTO
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Si se hace clic en el enlace, dejar que maneje la navegación
        if (e.target.closest('.project-link')) {
            return;
        }

        // De lo contrario, hacer clic en el enlace programáticamente
        const link = card.querySelector('.project-link');
        if (link) {
            link.click();
        }
    });
});

// ===================================
// EFECTO DE ESCRITURA PARA HÉROE (Mejora Opcional)
// ===================================
function initTypingEffect() {
    const roles = [
        'Estudiante en Práctica',
        'Entusiasta de la IA',
        'Desarrollador Python'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        const staticText = 'Estudiante | ';
        subtitleElement.textContent = staticText + currentRole.substring(0, charIndex);

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, timeout);
    }

    // Descomentar para habilitar efecto de escritura
    // type();
}

// ===================================
// EFECTO PARALLAX PARA ORBES DE GRADIENTE
// ===================================
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Inicializar efecto parallax
initParallax();

// ===================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ===================================

// Carga diferida de imágenes (si se añaden imágenes después)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}



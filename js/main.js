document.addEventListener('DOMContentLoaded', () => {

    // ========== LOADING SCREEN ==========
    const loader = document.getElementById('loader');

    const hideLoader = () => {
        if (loader) {
            loader.classList.add('loaded');
            // Remove from DOM after transition
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }
    };

    // Hide loader when everything is loaded, with a minimum display time
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 3500); // Minimum 3.5s to show the full spin-in animation
    });

    // Fallback: hide loader after 4 seconds regardless
    setTimeout(hideLoader, 5500);

    // ========== INITIALIZE AOS ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80,
        });
    }

    // ========== INITIALIZE PARTICLES.JS ==========
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 900 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.35,
                    "random": true,
                    "anim": { "enable": true, "speed": 0.8, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 2.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1.5, "size_min": 0.3, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 160,
                    "color": "#ffffff",
                    "opacity": 0.15,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 180, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // ========== NAVBAR SCROLL BEHAVIOR ==========
    const navbar = document.getElementById('navbar');

    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // Initial call

    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ========== ACTIVE NAV LINK HIGHLIGHT ==========
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Cinematic Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Trigger initial hero animations after loader
        document.querySelectorAll('.hero .reveal-up, .hero .reveal-scale').forEach(el => {
            el.classList.add('active');
        });
    }, 2000); // 2 second cinematic pause

    // 2. Navbar Scroll Effect & Back to Top Visibility
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
    });

    // 3. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animation (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        // Skip hero elements as they are handled by loader
        if(!el.closest('.hero')) {
            revealObserver.observe(el);
        }
    });

    // 5. Active Navigation Link Indicator
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Back to Top Functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 7. Floating Gold Particles (Hero Section)
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = '#D6B779';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = `-${Math.random() * 10}s`;
            
            // Add custom keyframe dynamically if not present
            if (!document.getElementById('particleStyle')) {
                const style = document.createElement('style');
                style.id = 'particleStyle';
                style.innerHTML = `
                    @keyframes floatParticle {
                        0% { transform: translateY(0) translateX(0); }
                        33% { transform: translateY(-30px) translateX(20px); }
                        66% { transform: translateY(-15px) translateX(-20px); }
                        100% { transform: translateY(0) translateX(0); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            particlesContainer.appendChild(particle);
        }
    }

    // 8. Smooth Scrolling for older browsers (fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Download Matrimonial Biodata as PDF

function downloadBiodata() {

    // Wait briefly to ensure all page content is ready
    window.setTimeout(() => {

        window.print();

    }, 200);

}
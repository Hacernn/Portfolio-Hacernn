/* ============================================
   HASBIH CESARO RAMADHAN - Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== DOM ELEMENTS =====
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const heroParticles = document.getElementById('heroParticles');
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const preloaderStatus = document.querySelector('.preloader-status');

    // ===== PRELOADER LOGIC =====
    if (preloader) {
        let progress = 0;
        
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90; // Hold at 90% until actual load
            updateProgress(progress);
        }, 150);

        function updateProgress(val) {
            if (preloaderBar) preloaderBar.style.width = `${val}%`;
            if (val > 30 && val < 60 && preloaderStatus) {
                preloaderStatus.textContent = 'LOADING ASSETS...';
            } else if (val >= 60 && val < 90 && preloaderStatus) {
                preloaderStatus.textContent = 'CONFIGURING ENVIRONMENT...';
            } else if (val >= 90 && preloaderStatus) {
                preloaderStatus.textContent = 'SYSTEM READY.';
            }
        }

        window.addEventListener('load', () => {
            clearInterval(progressInterval);
            progress = 100;
            updateProgress(progress);
            
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    let lastScroll = 0;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll
        updateActiveNavLink();

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== MOBILE NAV TOGGLE =====
    // Create overlay
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);

    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMobileNav);
    navOverlay.addEventListener('click', closeMobileNav);

    // Close nav on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileNav();
        });
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== BACK TO TOP =====
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== PROJECT FILTER =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'semua' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===== CONTACT FORM =====
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        if (!name || !email || !message) {
            showToast('Mohon lengkapi semua field! ⚠️');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Format email tidak valid! ⚠️');
            return;
        }

        // Simulate form submission
        showToast('Pesan berhasil dikirim! Terima kasih 🎉');
        contactForm.reset();
    });

    // ===== TOAST NOTIFICATION =====
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== RETRO PIXEL DUST CANVAS ANIMATION =====
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const colors = [
            '#00f0ff', // Cyber Cyan
            '#ff00f0', // Cyber Magenta
            '#ffb000', // Amber
            '#39ff14'  // Neon Green
        ];

        function resizeCanvas() {
            const hero = document.getElementById('home');
            if (hero) {
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;
            }
        }

        class PixelParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50;
                this.size = [4, 6, 8][Math.floor(Math.random() * 3)]; // Stepped pixel sizes
                this.speed = 0.4 + Math.random() * 1.2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.drift = -0.2 + Math.random() * 0.4;
                this.driftInterval = 120 + Math.random() * 180;
                this.age = 0;
            }

            update() {
                this.y -= this.speed;
                this.x += this.drift;
                this.age++;

                if (this.age % Math.floor(this.driftInterval) === 0) {
                    this.drift = -0.2 + Math.random() * 0.4;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                // Draw retro square blocks
                ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
            }
        }

        function initParticles() {
            resizeCanvas();
            particles = [];
            const initialCount = 45;
            for (let i = 0; i < initialCount; i++) {
                const p = new PixelParticle();
                p.y = Math.random() * canvas.height;
                particles.push(p);
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (particles.length < 60 && Math.random() < 0.15) {
                particles.push(new PixelParticle());
            }

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                if (p.y + p.size < 0 || p.x + p.size < 0 || p.x > canvas.width) {
                    particles[index] = new PixelParticle();
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        initParticles();
        animate();
    }

    // ===== SCROLL REVEAL ANIMATION =====
    function initScrollReveal() {
        const elements = document.querySelectorAll(
            '.section-title, .about-content, .skill-card, .project-card, .contact-wrapper'
        );

        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add stagger delay for grid items
                        const parent = entry.target.parentElement;
                        if (parent) {
                            const siblings = parent.querySelectorAll('.animate-on-scroll');
                            siblings.forEach((sibling, index) => {
                                if (sibling === entry.target) {
                                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                                }
                            });
                        }

                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elements.forEach(el => observer.observe(el));
    }

    initScrollReveal();

    // ===== SKILL CARDS TILT EFFECT =====
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== TYPING EFFECT FOR HERO ROLE =====
    const heroRole = document.querySelector('.hero-role strong');
    if (heroRole) {
        const roles = ['3D Artist', 'Web Developer', 'Game Developer', 'UI Designer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                heroRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(typeRole, typingSpeed);
        }

        // Start typing after a delay
        setTimeout(typeRole, 2000);
    }

    // ===== CV MODAL =====
    const cvModal = document.getElementById('cvModal');
    const openCvBtn = document.getElementById('openCvBtn');
    const closeCvModal = document.getElementById('closeCvModal');

    if (openCvBtn && cvModal && closeCvModal) {
        openCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cvModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeCvModal.addEventListener('click', () => {
            cvModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close when clicking outside the image
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                cvModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // ===== PROJECT CAROUSEL MODAL =====
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let totalSlides = 3;

    // Dummy images for each project
    const projectData = {
        web1: ['webgresiktampilan1.png', 'webgresiktampilan2.png', 'webgresiktampilan3.png'],
        game1: ['game2dtampilan1.jpeg', 'game2dtampilan2.jpeg', 'game2dtampilan3.jpeg'],
        game2: ['game3dtampilan1.png', 'game3dtampilan3.png', 'game3dtampilan4.png'],
        asset1: ['charactercowok1.png', 'charactercowok2.png', 'charactercowok3.png'],
        asset2: ['ajisaka1.png', 'ajisaka2.png', 'ajisaka3.png'],
        asset3: ['dewatacengkar1.png', 'dewatacengkar2.png', 'dewatacengkar3.png'],
        asset4: ['rohpenjaga0.png', 'rohpenjaga1.png', 'rohpenjaga2.png']
    };

    function updateCarousel() {
        if(carouselTrack) carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (projectModal) {
        document.querySelectorAll('.detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const proj = btn.getAttribute('data-project');
                const images = projectData[proj] || projectData.web1;
                
                carouselTrack.innerHTML = '';
                images.forEach(src => {
                    const li = document.createElement('li');
                    li.classList.add('carousel-slide');
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = 'Project Screenshot';
                    li.appendChild(img);
                    carouselTrack.appendChild(li);
                });

                currentSlide = 0;
                updateCarousel();
                
                projectModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        closeProjectModal.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
            if (cvModal && cvModal.style.display === 'block') {
                cvModal.style.display = 'none';
                document.body.style.overflow = '';
            }
            if (projectModal && projectModal.style.display === 'block') {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });

    // ===== INITIAL SCROLL CHECK =====
    handleScroll();
});

// HyperDrive EV JavaScript - Advanced 3D Animations & Interactions

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Global variables
let scene, camera, renderer, carModel, mixer;
let locomotiveScroll;
let isLoading = true;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initNavigation();
    initThreeJS();
    initGSAPAnimations();
    initLocomotiveScroll();
    initInteractions();
    initScrollAnimations();
    
    // Remove loading screen after everything is loaded
    setTimeout(() => {
        hideLoading();
    }, 1500);
});

// Loading Screen Management
function initLoading() {
    const loading = document.getElementById('loading');
    
    // Simplified loading animation for faster performance
    gsap.to('#loading .text-2xl', {
        scale: 1.05, // Reduced scale effect
        duration: 0.5, // Reduced from 1 to 0.5 seconds
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });
}

function hideLoading() {
    const loading = document.getElementById('loading');
    
    gsap.to(loading, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
            loading.style.display = 'none';
            isLoading = false;
            
            // Start main animations
            startMainAnimations();
        }
    });
}

// Navigation Management
function initNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    // Mobile menu implementation for responsive design
    const nav = document.querySelector('nav');
    let mobileMenu = nav.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#gallery">Gallery</a>
            <a href="#specs">Specs</a>
            <a href="#contact">Contact</a>
        `;
        nav.appendChild(mobileMenu);
        
        // Add click handlers
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    mobileMenu.classList.toggle('active');
}

// Three.js 3D Car Model Setup
function initThreeJS() {
    const container = document.getElementById('car-container');
    const fallbackImage = document.getElementById('fallback-image');
    
    if (!container) return;
    
    try {
        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        container.appendChild(renderer.domElement);
        
        // Lighting setup
        setupLighting();
        
        // Load car model or show fallback
        loadCarModel().catch(() => {
            showFallbackImage();
        });
        
        // Camera position
        camera.position.set(5, 2, 8);
        camera.lookAt(0, 0, 0);
        
        // Start render loop
        animate();
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
    } catch (error) {
        console.log('WebGL not supported, using fallback image');
        showFallbackImage();
    }
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = false;
    scene.add(directionalLight);
    
    // Neon blue accent lights
    const neonLight1 = new THREE.PointLight(0x00ffff, 0.8, 100);
    neonLight1.position.set(-5, 3, 5);
    scene.add(neonLight1);
    
    const neonLight2 = new THREE.PointLight(0x0080ff, 0.6, 100);
    neonLight2.position.set(5, 3, -5);
    scene.add(neonLight2);
}

async function loadCarModel() {
    // For this demo, we'll create a simple car-like geometry
    // In a real project, you would load a .glb/.gltf file
    createSimpleCarModel();
}

function createSimpleCarModel() {
    const carGroup = new THREE.Group();
    
    // Simplified car body (reduced complexity for faster loading)
    const bodyGeometry = new THREE.BoxGeometry(4, 1, 2);
    const bodyMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a1a1a
    });
    const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    carBody.position.y = 0.5;
    carGroup.add(carBody);
    
    // Simplified car roof
    const roofGeometry = new THREE.BoxGeometry(2.5, 0.8, 1.8);
    const roofMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a
    });
    const carRoof = new THREE.Mesh(roofGeometry, roofMaterial);
    carRoof.position.y = 1.4;
    carGroup.add(carRoof);
    
    // Simplified wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 6); // Even fewer segments
    const wheelMaterial = new THREE.MeshBasicMaterial({
        color: 0x2a2a2a
    });
    
    const positions = [
        [-1.3, 0.4, 1.2],
        [1.3, 0.4, 1.2],
        [-1.3, 0.4, -1.2],
        [1.3, 0.4, -1.2]
    ];
    
    positions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        carGroup.add(wheel);
    });
    
    // Simplified neon accents
    const neonGeometry = new THREE.BoxGeometry(4.2, 0.1, 0.1);
    const neonMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff
    });
    
    const neonAccent1 = new THREE.Mesh(neonGeometry, neonMaterial);
    neonAccent1.position.set(0, 0.2, 1.05);
    carGroup.add(neonAccent1);
    
    const neonAccent2 = new THREE.Mesh(neonGeometry, neonMaterial);
    neonAccent2.position.set(0, 0.2, -1.05);
    carGroup.add(neonAccent2);
    
    // Add to scene
    scene.add(carGroup);
    carModel = carGroup;
    
    // Position the car
    carModel.position.y = -1;
    carModel.rotation.y = 0.3;
}

function showFallbackImage() {
    const fallbackImage = document.getElementById('fallback-image');
    const carContainer = document.getElementById('car-container');
    
    if (fallbackImage && carContainer) {
        fallbackImage.classList.remove('hidden');
        carContainer.style.display = 'none';
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (carModel && !isLoading) {
        // Rotate the car slowly
        carModel.rotation.y += 0.005;
        
        // Subtle floating animation
        carModel.position.y = -1 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// GSAP Animations
function initGSAPAnimations() {
    // Set initial states
    gsap.set('.hero-title', { y: 100, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 50, opacity: 0 });
    gsap.set('.cta-button', { y: 30, opacity: 0 });
}

function startMainAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl
        .to('.hero-title', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
        })
        .to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .to('.cta-button', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");
}

// Locomotive Scroll
function initLocomotiveScroll() {
    try {
        locomotiveScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.8,
            class: 'is-inview'
        });

        // Update ScrollTrigger when locomotive scroll updates
        locomotiveScroll.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length 
                    ? locomotiveScroll.scrollTo(value, 0, 0)
                    : locomotiveScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: document.querySelector('[data-scroll-container]').style.transform
                ? "transform"
                : "fixed"
        });

        ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
        ScrollTrigger.refresh();
        
    } catch (error) {
        console.log('Locomotive Scroll not available, using native scroll');
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Features section animation
    gsap.from('.feature-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#features',
            start: 'top 80%',
            scroller: '[data-scroll-container]'
        }
    });
    
    // Gallery items animation
    gsap.from('.gallery-item', {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#gallery',
            start: 'top 80%',
            scroller: '[data-scroll-container]'
        }
    });
    
    // Specs animation with counter
    gsap.from('.spec-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '#specs',
            start: 'top 80%',
            scroller: '[data-scroll-container]',
            onEnter: animateCounters
        }
    });
    
    // Contact form animation
    gsap.from('#contact-form', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            scroller: '[data-scroll-container]'
        }
    });
    
    // Parallax effects
    gsap.to('#particles', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '#hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: '[data-scroll-container]'
        }
    });
}

// Counter Animation
function animateCounters() {
    document.querySelectorAll('.spec-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        
        gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: target % 1 === 0 ? 1 : 0.1 },
            onUpdate: function() {
                counter.innerText = Math.round(this.targets()[0].innerText * 10) / 10;
            }
        });
    });
}

// Interactive Features
function initInteractions() {
    // CTA Button click
    document.querySelector('.cta-button')?.addEventListener('click', () => {
        document.querySelector('#features')?.scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Video toggle
    const videoToggle = document.getElementById('video-toggle');
    const bgVideo = document.getElementById('bg-video');
    
    if (videoToggle && bgVideo) {
        videoToggle.addEventListener('click', () => {
            if (bgVideo.muted) {
                bgVideo.muted = false;
                videoToggle.innerHTML = `
                    <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
                    </svg>
                    Mute Sound
                `;
            } else {
                bgVideo.muted = true;
                videoToggle.innerHTML = `
                    <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.586 9.586A2 2 0 0011.414 12.586l.586-.586z"></path>
                    </svg>
                    Toggle Sound
                `;
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Gallery horizontal scroll
    const galleryWrapper = document.querySelector('.horizontal-scroll-wrapper');
    if (galleryWrapper) {
        let isScrolling = false;
        
        galleryWrapper.addEventListener('wheel', (e) => {
            if (!isScrolling) {
                e.preventDefault();
                isScrolling = true;
                
                galleryWrapper.scrollBy({
                    left: e.deltaY * 2,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
    }
}

// Form Submission Handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSuccess = document.getElementById('submit-success');
    
    // Animate button
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    // Simulate form submission
    setTimeout(() => {
        submitText.classList.add('hidden');
        submitSuccess.classList.remove('hidden');
        
        gsap.from(submitSuccess, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitText.classList.remove('hidden');
            submitSuccess.classList.add('hidden');
            e.target.reset();
        }, 3000);
    }, 1000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const optimizedResize = debounce(onWindowResize, 250);
window.addEventListener('resize', optimizedResize);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (locomotiveScroll) {
        locomotiveScroll.destroy();
    }
    
    if (renderer) {
        renderer.dispose();
    }
});

// Export for global access
window.HyperDriveEV = {
    locomotiveScroll,
    scene,
    camera,
    renderer,
    carModel
};
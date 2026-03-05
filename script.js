document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize page loader
    const loader = document.getElementById('loader');
    if (loader) {
        // Hide loader after window load
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500);
    }

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar active state management
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });

        // Collapse mobile menu on click
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: true});
                bsCollapse.hide();
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Animated number counters
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Toggle logic for Trends vs Fads content
    const trendToggle = document.getElementById('trendToggle');
    if (trendToggle) {
        trendToggle.addEventListener('change', function() {
            const isChecked = this.checked;
            const trendContent = document.getElementById('trend-content');
            const fadContent = document.getElementById('fad-content');
            
            if (isChecked) {
                trendContent.innerHTML = '<h4 class="fw-bold text-success mb-3">Example: Denim Jeans</h4><p>A classic fashion staple that has remained popular for decades, evolving in style but never disappearing. It meets a sustained need for durable clothing.</p>';
                fadContent.innerHTML = '<h4 class="fw-bold text-danger mb-3">Example: Fidget Spinners</h4><p>Exploded in popularity in 2017 and disappeared almost as quickly as they arrived. It was a novelty item with no long-term utility.</p>';
            } else {
                trendContent.innerHTML = '<h4 class="fw-bold text-success mb-3">Trend</h4><p>A pattern of gradual change in a condition, output, or process, or an average or general tendency of a series of data points to move in a certain direction over time.</p>';
                fadContent.innerHTML = '<h4 class="fw-bold text-danger mb-3">Fad</h4><p>An intense and widely shared enthusiasm for something, especially one that is short-lived and without a basis in the object\'s qualities.</p>';
            }
        });
    }

    // Scroll progress bar and back-to-top button visibility
    const progressBar = document.getElementById('myBar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
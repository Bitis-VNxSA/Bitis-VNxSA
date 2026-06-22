document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Bird Reveal Animation Trigger
    const journeySection = document.getElementById('journey');

    const birdObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                journeySection.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    if (journeySection) {
        birdObserver.observe(journeySection);
    }

    // GSAP Footprint Journey Animation
    gsap.registerPlugin(ScrollTrigger);

    const fpTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-journey-container",
            start: "top 30%",
            end: "bottom bottom",
            toggleActions: "play none none none"
        }
    });

    const wrapper = document.querySelector('.journey-content-wrapper');
    const wrapperWidth = wrapper ? wrapper.offsetWidth : window.innerWidth;

    fpTimeline
        .to(".sa-lac-bird", {
            opacity: 1,
            left: "10%",
            duration: 0.3,
            ease: "power2.out"
        })
        .to(".footprint", {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.1")
        .to(".sa-lac-bird", {
            left: "110%",
            duration: 0.8,
            ease: "power1.inOut"
        }, "+=0.2")
        .to(".sa-lac-bird", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.2")
        .to(".footprint", {
            opacity: 0,
            y: -30,
            scale: 1.02,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in"
        }, "-=0.1")
        .to(".why-sa-grid", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.2");

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.querySelector('span') ? stat.querySelector('span').innerText : '';

        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
            },
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function () {
                if (suffix) {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + `<span>${suffix}</span>`;
                }
            }
        });
    });

    // Add subtle dust motion on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.fp-left, .fp-right').forEach((fp, index) => {
            const speed = 0.02 * (index + 1);
            const rotation = fp.classList.contains('fp-left') ? 10 : -10;
            fp.style.transform = `translateY(${scrolled * speed % 5}px) rotate(${rotation}deg)`;
        });
    });

    // Reveal on scroll animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .product-card, .connection-item, section h2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom CSS for intersection observer reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

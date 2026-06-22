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

    // GSAP Rhythm Journey Animation
    const rhythmSection = document.querySelector('#rhythm.scroll-journey-container');
    if (rhythmSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const rhythmTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#rhythm",
                start: "top 65%",
                end: "bottom bottom",
                toggleActions: "play none none none"
            }
        })
            .set(".rhythm-container img", {
                opacity: 0,
                y: 20,
                scale: 0.985
            })
            .set(".sa-lac-bird", {
                opacity: 0,
                left: "-200px"
            })
            .set(".footprint", {
                opacity: 0,
                y: 0,
                scale: 1
            })
            .to(".sa-lac-bird", {
                opacity: 1,
                left: "8%",
                duration: 0.9,
                ease: "power2.out"
            })
            .to(".footprint", {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out"
            }, "<")
            // slow, steady glide all the way offscreen, then vanish
            .to(".sa-lac-bird", {
                left: "140%",
                duration: 7,
                ease: "linear"
            })
            // once fully offscreen, fade bird then immediately hide footprints and show rhythm image
            .to(".sa-lac-bird", {
                opacity: 0,
                duration: 0.24,
                ease: "power2.in"
            })
            // remove footprints instantly and reveal main rhythm image at the same time
            .to(".footprint", {
                opacity: 0,
                duration: 0,
                stagger: 0,
                ease: "none"
            }, "<")
            .to(".rhythm-container img", {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "<")
            ;
    }

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

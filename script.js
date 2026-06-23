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

    // GSAP Rhythm Journey Animation removed bird logic
    const fusionGallery = document.querySelector('.fusion-gallery');
    if (fusionGallery) {
        gsap.set(fusionGallery, { opacity: 1, y: 0, scale: 1 });
    }

    // GSAP Product Section Animation
    const productSectionEl = document.querySelector('#product');
    if (productSectionEl && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const productCards = document.querySelectorAll('.product-card');
        const footprints = document.querySelectorAll('.product-fp');

        gsap.timeline({
            scrollTrigger: {
                trigger: "#product",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        })
            .set(".product-bird", { opacity: 0, left: "-200px" })
            .set(footprints, { opacity: 0, scale: 0.8 })
            .set(productCards, { opacity: 0, y: 30 })
            .to(".product-bird", {
                opacity: 1,
                left: "0%",
                duration: 0.8,
                ease: "power2.out"
            })
            // Reveal all footprints first (walking trail)
            .to(footprints, {
                opacity: 1,
                scale: 1,
                stagger: 0.2,
                duration: 0.4,
                ease: "back.out(1.7)"
            })
            // Bird starts flying across and "converting" footprints to cards
            .to(".product-bird", {
                left: "140%",
                duration: 5,
                ease: "none"
            }, "+=0.2")
            // Card 1 reveal
            .to(footprints[0], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=4.6")
            .to(productCards[0], { opacity: 1, y: 0, duration: 0.5 }, "-=4.4")
            // Card 2 reveal
            .to(footprints[1], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=3.2")
            .to(productCards[1], { opacity: 1, y: 0, duration: 0.5 }, "-=3.0")
            // Card 3 reveal
            .to(footprints[2], { opacity: 0, scale: 1.2, duration: 0.3 }, "-=1.8")
            .to(productCards[2], { opacity: 1, y: 0, duration: 0.5 }, "-=1.6")
            .to(".product-bird", {
                opacity: 0,
                duration: 0.5
            }, "-=0.5");
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

    document.querySelectorAll('.card, .connection-item, section h2').forEach(el => {
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

    // Language Toggle Support - Vietnamese translations
    const translations = {
        en: {
            journeyHeading: "A STORY IN<br>MOTION",
            journeySubtitle: "From the coffee highlands of Vietnam to the vibrant streets of South Africa. Different places, same rhythm.",
            kmCaption: "10,433 KM<br>Across the<br>Indian Ocean",
            card1Title: "Coffee Highlands",
            card1Text: "Where millions of coffee beans are grown. And our story begins.",
            card2Title: "Coffee Grounds",
            card2Text: "What's left behind can still create something amazing.",
            card3Title: "GroundStep Technology",
            card3Text: "Recycled coffee grounds turned into a high-performance insole.",
            card4Title: "Geluk",
            card4Text: "Happiness in Afrikaans. A new word, same feeling.",
            card5Title: "Ubuntu",
            card5Text: "\"I am because we are.\" A philosophy that brings us together.",
            card6Title: "Cape Town Streets",
            card6Text: "New streets to walk. New stories to live. Same rhythm.",
            wordVN: "HẠNH PHÚC",
            wordAF: "GELUK",
            wordFromLang: "(VIETNAMESE)",
            wordToLang: "(AFRIKAANS)",
            tagline: "Different streets.<br>Same rhythm.",
            modal1Title: "Coffee Highlands",
            modal1Text: [
                "The Central Highlands of Vietnam is more than a coffee region — it is the heart of a global coffee story. High elevation and fertile basalt soils create the bold, resilient Robusta beans that form the foundation of this journey.",
                "A tropical monsoon climate with distinct wet and dry seasons gives coffee cherries a powerful, concentrated profile. This unique terroir builds the aromatic strength and structure that makes Biti's Hunter stand out worldwide.",
                "Vietnam is the world's top producer and exporter of Robusta coffee, contributing over 40% of global output. The Central Highlands supports nearly 640,000 farms and generates billions of dollars in export revenue each year."
            ],
            modal2Title: "Coffee Grounds",
            modal2Text: [
                "In the traditional linear value chain, used coffee grounds are treated as waste. After roasting and brewing, around 650g of wet grounds are left behind for every kilogram of coffee consumed.",
                "Under a circular-economy lens, coffee grounds become a valuable bio-resource with a porous structure and a naturally high surface area. Research shows they contain rich carbon and nitrogen levels, making them ideal for odor absorption and material innovation.",
                "For Biti's Hunter, this regeneration story resonates in South Africa, where eco-conscious young consumers increasingly choose products with meaningful sustainable narratives."
            ],
            modal3Title: "GroundStep™ Technology",
            modal3Text: [
                "GroundStep™ transforms Robusta coffee grounds from Vietnam's Central Highlands into a performance insole for modern footwear. This closed-loop process is managed through six precise physical and chemical stages.",
                "The technology delivers three core benefits: active moisture control, natural odor absorption, and breathable foam structure. Optimized micro-porosity lets the insole draw moisture away quickly, drying faster than conventional materials.",
                "Natural odor control is maintained by the high carbon and nitrogen content of coffee grounds, neutralizing odors from the source rather than masking them with coatings that wear off. The open-cell foam also improves airflow, keeping feet cooler during activity."
            ],
            modal4Title: "Geluk — Happiness",
            modal4Text: [
                "Instead of using a generic slogan, Biti's localizes the concept of happiness by translating it into Afrikaans as GELUK. This cultural adaptation deepens the connection between Vietnamese origin and the South African market.",
                "The creative pairing of Geluk with Vietnam's story is more than translation — it is a shared expression of aspiration, resilience, and joy between two nations.",
                "For Biti's Hunter 2/9 Special Edition, the idea of independence and pride becomes a visual and emotional symbol that resonates across both communities."
            ],
            modal5Title: "Ubuntu Philosophy",
            modal5Text: [
                "Ubuntu means 'I am because we are.' It emphasizes community, empathy, and collective strength, values that align closely with Biti's sustainable and socially responsible approach.",
                "The brand sees happiness not as individual reward but as a shared experience. By using coffee byproducts in production, Biti's supports farmers and reduces waste, making each step in the supply chain more meaningful.",
                "Connecting product storytelling with Ubuntu invites consumers to feel part of a larger movement — each step becomes a small act of kindness and shared purpose."
            ],
            modal6Title: "Cape Town Streets",
            modal6Text: [
                "Urban life in Cape Town and Johannesburg pulses with bold energy. The semi-arid climate and cool, wet winters demand footwear that balances breathability with temperature control.",
                "Street style in South Africa is embodied by 'Takkies' — shoes that express identity, movement, and confidence. The rise of Amapiano music and urban dance culture calls for footwear that responds instantly and feels fresh all day.",
                "GroundStep™ coffee-ground insoles support this lifestyle by improving moisture management, reducing odor naturally, and helping young people feel confident wherever they go."
            ],
            wordVN: "HẠNH PHÚC",
            wordAF: "GELUK",
            wordFromLang: "(VIETNAMESE)",
            wordToLang: "(AFRIKAANS)",
            tagline: "Different streets.<br>Same rhythm."
        },
        vi: {
            journeyHeading: "MỘT CÂU CHUYỆN<br>KHÔNG NGỪNG CHUYỂN ĐỘNG",
            journeySubtitle: "Từ những cao nguyên cà phê của Việt Nam đến những con phố sôi động của Nam Phi. Dẫu có khác biệt về địa lý, nhưng lại cùng chung một nhịp điệu.",
            kmCaption: "10,433 KM<br>Băng qua Ấn Độ<br>Dương",
            card1Title: "Cao nguyên cà phê",
            card1Text: "Nơi hàng triệu hạt cà phê được nuôi dưỡng mỗi năm, và cũng là nơi khởi đầu của từng bước chân",
            card2Title: "Bã cà phê",
            card2Text: "Những gì tưởng chừng bị bỏ lại phía sau vẫn có thể tạo nên những điều phi thường.",
            card3Title: "Công nghệ GroundStep™",
            card3Text: "Bã cà phê tái chế được chuyển hóa thành đế lót hiệu năng cao, nâng niu từng bước chân.",
            card4Title: "GELUK",
            card4Text: "\"Hạnh phúc\"",
            card5Title: "Ubuntu",
            card5Text: "\"Tôi tồn tại vì chúng ta tồn tại\" - Một triết lý đề cao sự gắn kết và sức mạnh của cộng đồng.",
            card6Title: "Đường phố Cape Town",
            card6Text: "Có những cung đường mới để khám phá, những câu chuyện mới để trải nghiệm, nhưng nhìn chung vẫn là cùng một nhịp điệu.",
            modal1Title: "Cao nguyên cà phê",
            modal1Text: [
                "Tây Nguyên, vùng đất cao nguyên đại ngàn của Việt Nam, không chỉ được biết đến với những sử thi hùng vĩ mà còn là trái tim của ngành cà phê toàn cầu. Địa hình cao và tầng đất đỏ bazan phì nhiêu tạo nên những hạt Robusta đậm đà và bền bỉ.",
                "Khí hậu nhiệt đới gió mùa cùng hai mùa mưa nắng rõ rệt giúp hạt cà phê tích lũy độ đậm đặc và cấu trúc hương đặc trưng. Đây chính là nền tảng tạo nên bản sắc cho Biti's Hunter.",
                "Việt Nam hiện đứng đầu thế giới về sản xuất và xuất khẩu cà phê Robusta, đóng góp hơn 40% sản lượng toàn cầu. Tây Nguyên hỗ trợ gần 640.000 hộ nông dân và tạo ra giá trị xuất khẩu hàng tỷ đô la mỗi năm."
            ],
            modal2Title: "Bã cà phê",
            modal2Text: [
                "Trong chuỗi giá trị tuyến tính truyền thống, bã cà phê thường được coi là chất thải. Sau khi rang xay và chiết xuất, khoảng 650g bã ẩm còn lại cho mỗi kilogram cà phê được tiêu thụ.",
                "Trong kinh tế tuần hoàn, bã cà phê trở thành nguồn tài nguyên quý với cấu trúc xốp và diện tích bề mặt tự nhiên lớn. Nghiên cứu cho thấy chúng chứa nhiều carbon và nitơ, phù hợp cho việc hấp thụ mùi và đổi mới vật liệu.",
                "Đối với Biti's Hunter, câu chuyện tái sinh này phù hợp với thị trường Nam Phi, nơi thanh niên quan tâm đến sản phẩm có giá trị bền vững và ý nghĩa."
            ],
            modal3Title: "Công nghệ GroundStep™",
            modal3Text: [
                "GroundStep™ biến bã cà phê Robusta từ Tây Nguyên thành đế lót hiệu năng cho giày hiện đại. Quy trình khép kín này được kiểm soát nghiêm ngặt qua sáu giai đoạn vật lý và hóa học.",
                "Công nghệ đem lại ba lợi ích chính: hút ẩm chủ động, khử mùi tự nhiên và cấu trúc thoáng khí. Mật độ vi lỗ tối ưu giúp đế lót hút ẩm nhanh và khô vượt trội so với vật liệu thông thường.",
                "Khả năng khử mùi tự nhiên đến từ carbon và nitơ trong bã cà phê, giúp trung hòa mùi từ gốc thay vì che phủ bằng lớp phủ yếu dần theo thời gian. Cấu trúc foam mở cũng hỗ trợ lưu thông không khí, giữ chân mát hơn khi vận động."
            ],
            modal4Title: "Geluk - Hạnh Phúc",
            modal4Text: [
                "Thay vì dùng slogan chung chung, Biti's đã địa phương hóa khái niệm hạnh phúc bằng cách dịch sang tiếng Afrikaans là GELUK. Điều này kết nối sâu sắc hơn giữa nguồn gốc Việt Nam và thị trường Nam Phi.",
                "Việc ghép Geluk với câu chuyện Việt Nam không chỉ là dịch thuật mà còn là sự chia sẻ khát vọng, kiên cường và niềm vui giữa hai nền văn hóa.",
                "Với phiên bản Biti's Hunter 2/9 Special Edition, tinh thần độc lập và niềm tự hào trở thành biểu tượng cảm xúc mang tính xuyên biên giới."
            ],
            modal5Title: "Triết lý Ubuntu",
            modal5Text: [
                "Ubuntu có nghĩa là 'Tôi tồn tại vì chúng ta tồn tại'. Triết lý này đề cao cộng đồng, lòng đồng cảm và sức mạnh chung — trùng khớp với hướng đi bền vững của Biti's.",
                "Thương hiệu coi hạnh phúc không phải là thành quả cá nhân mà là trải nghiệm chia sẻ. Việc sử dụng phụ phẩm cà phê trong sản xuất đã hỗ trợ nông dân và giảm chất thải, khiến mỗi bước chân trở nên có ý nghĩa hơn.",
                "Gắn câu chuyện sản phẩm với Ubuntu giúp người dùng cảm nhận mình là một phần của chuyển động lớn hơn — mỗi bước là một hành động tử tế và hạnh phúc lan tỏa."
            ],
            modal6Title: "Đường phố Cape Town",
            modal6Text: [
                "Nhịp sống đô thị ở Cape Town và Johannesburg tràn đầy năng lượng. Khí hậu bán khô hạn và mùa đông ẩm đòi hỏi giày phải cân bằng tính thoáng khí với khả năng điều hòa nhiệt.",
                "Thời trang đường phố Nam Phi gắn liền với 'Takkies' — những đôi giày thể hiện phong cách, chuyển động và sự tự tin. Sự bùng nổ của âm nhạc Amapiano và văn hóa vũ đạo yêu cầu giày phản hồi nhanh và luôn thoải mái.",
                "Đế lót GroundStep™ từ bã cà phê giúp hỗ trợ phong cách này bằng cách cải thiện xử lý ẩm, giảm mùi tự nhiên và giúp người trẻ tự tin di chuyển khắp thành phố."
            ],
            wordVN: "HẠNH PHÚC",
            wordAF: "GELUK",
            wordFromLang: "(TIẾNG VIỆT)",
            wordToLang: "(TIẾNG AFRIKAANS)",
            tagline: "Những con phố khác.<br>Nhưng cùng một nhịp điệu."
        }
    };

    let currentLang = 'en';

    function switchLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('siteLanguage', lang);

        // Update heading
        const h1 = document.querySelector('.title-block h1');
        if (h1) h1.innerHTML = translations[lang].journeyHeading;

        // Update subtitle
        const subtitle = document.querySelector('.title-block .subtitle');
        if (subtitle) subtitle.textContent = translations[lang].journeySubtitle;

        // Update KM caption
        const kmCaption = document.querySelector('.km-caption');
        if (kmCaption) kmCaption.innerHTML = translations[lang].kmCaption;

        // Update cards
        const cards = document.querySelectorAll('.card');
        const cardKeys = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
        cards.forEach((card, index) => {
            const key = cardKeys[index];
            const titleEl = card.querySelector('.card-title');
            const textEl = card.querySelector('.card-text');
            if (titleEl) titleEl.textContent = translations[lang][key + 'Title'];
            if (textEl) textEl.textContent = translations[lang][key + 'Text'];
        });

        // Update word swap
        const wordVN = document.querySelector('.word-vn');
        const wordAF = document.querySelector('.word-af');
        const wordLangs = document.querySelectorAll('.word-lang');
        if (wordVN) wordVN.textContent = translations[lang].wordVN;
        if (wordAF) wordAF.textContent = translations[lang].wordAF;
        if (wordLangs[0]) wordLangs[0].textContent = translations[lang].wordFromLang;
        if (wordLangs[1]) wordLangs[1].textContent = translations[lang].wordToLang;

        // Update tagline
        const tagline = document.querySelector('.tagline');
        if (tagline) tagline.innerHTML = translations[lang].tagline;

        // Update journey modal content
        const journeyModals = [
            { id: 'modal-journey-1', title: translations[lang].modal1Title, text: translations[lang].modal1Text },
            { id: 'modal-journey-2', title: translations[lang].modal2Title, text: translations[lang].modal2Text },
            { id: 'modal-journey-3', title: translations[lang].modal3Title, text: translations[lang].modal3Text },
            { id: 'modal-journey-4', title: translations[lang].modal4Title, text: translations[lang].modal4Text },
            { id: 'modal-journey-5', title: translations[lang].modal5Title, text: translations[lang].modal5Text },
            { id: 'modal-journey-6', title: translations[lang].modal6Title, text: translations[lang].modal6Text }
        ];

        journeyModals.forEach((modalData) => {
            const modal = document.getElementById(modalData.id);
            if (!modal) return;
            const modalTitle = modal.querySelector('.modal-title');
            const modalBody = modal.querySelector('.modal-descriptionScroll');
            if (modalTitle) modalTitle.textContent = modalData.title;
            if (modalBody) {
                modalBody.innerHTML = modalData.text.map(paragraph => `<p>${paragraph}</p>`).join('');
            }
        });

        // Apply Vietnamese Font style matching "Hạnh Phúc"
        const journeyH1 = document.querySelector('.journey-section h1');
        const cardTitles = document.querySelectorAll('.card-title');
        const nodes = document.querySelectorAll('.node');
        
        if (lang === 'vi') {
            if (journeyH1) journeyH1.classList.add('vi-font');
            cardTitles.forEach(t => t.classList.add('vi-font'));
            nodes.forEach(n => n.classList.add('vi-font'));
        } else {
            if (journeyH1) journeyH1.classList.remove('vi-font');
            cardTitles.forEach(t => t.classList.remove('vi-font'));
            nodes.forEach(n => n.classList.remove('vi-font'));
        }
    }

    // Attach event listener to EN|VI link
    const allLinks = document.querySelectorAll('a');
    let langLink = null;
    for (let link of allLinks) {
        if (link.textContent.includes('EN') && link.textContent.includes('VI')) {
            langLink = link;
            break;
        }
    }

    if (langLink) {
        langLink.style.cursor = 'pointer';
        langLink.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'vi' : 'en';
            switchLanguage(newLang);
            langLink.textContent = newLang === 'en' ? 'EN | VI' : 'VI | EN';
        });
    }

    // Restore saved language on page load
    const savedLang = localStorage.getItem('siteLanguage') || 'en';
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
        if (langLink) {
            langLink.textContent = savedLang === 'en' ? 'EN | VI' : 'VI | EN';
        }
    }
    // Modal Logic
    const modalTriggers = document.querySelectorAll('.product-link, .card[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const allModals = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            allModals.forEach(modal => modal.classList.remove('active'));
            document.body.style.overflow = '';
        });
    });

    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

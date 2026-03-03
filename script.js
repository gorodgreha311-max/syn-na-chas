document.addEventListener('DOMContentLoaded', function() {
    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-bs-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Обновление Bootstrap theme
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 300);
    });

    // Smooth scroll для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Закрыть мобильное меню, если оно открыто
            const navbarCollapse = document.getElementById('navbarNav');
            if (window.innerWidth <= 991 && navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
            
            // Плавный скролл
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Эффекты навбара и кнопки наверх
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('main-nav');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        
        // Navbar scrolled эффект
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Кнопка наверх
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Кнопка наверх
    document.getElementById('scrollTopBtn').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Форма обратной связи
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправляем...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`✅ Спасибо, ${name}!\n\n📞 Перезвоню на ${phone} через 5 минут.\n${message ? '📝 Учту пожелания: ' + message : ''}`);
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Маска телефона +7
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('8')) value = '7' + value.substring(1);
        if (value.length > 10) value = value.substring(0, 10);
        
        let formatted = '+7 ';
        if (value.length > 0) formatted += '(' + value.substring(0, 3);
        if (value.length >= 4) {
            formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 7) {
            formatted += '-' + value.substring(6, 8);
        }
        if (value.length >= 9) {
            formatted += '-' + value.substring(8, 10);
        }
        
        e.target.value = formatted;
    });

    // Инициализация карусели отзывов
    const reviewCarousel = new bootstrap.Carousel(document.getElementById('reviewsCarousel'), {
        interval: 5000,
        wrap: true
    });

    console.log('🚀 Сайт готов! Темная/светлая тема, бургер-меню, все функции работают.');
});

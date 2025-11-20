// Countdown timer for Flash Sale
function updateCountdown() {
    const now = new Date();
    const endTime = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000) + (38 * 60 * 1000) + (9 * 1000));
    
    const timeLeft = endTime - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
if (document.getElementById('days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}



// Add to cart functionality
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent);
            count++;
            cartCount.textContent = count;
            
            // Add animation
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Sidebar menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
let overlay = null;

function createOverlay() {
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    return overlay;
}

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        const overlayEl = createOverlay();
        overlayEl.classList.toggle('active');
    });
}

// Close sidebar when clicking on a category
document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', function() {
        sidebar.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    });
});

// Banner scroll effect
let lastScrollTop = 0;
const banner = document.querySelector('.hero-banner');
const bannerHeight = banner ? banner.offsetHeight : 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (banner) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            const shrinkAmount = Math.min((scrollTop - 100) / bannerHeight, 1);
            banner.style.maxHeight = `${bannerHeight * (1 - shrinkAmount)}px`;
            banner.style.opacity = 1 - shrinkAmount;
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            const shrinkAmount = Math.max((scrollTop - 100) / bannerHeight, 0);
            banner.style.maxHeight = shrinkAmount <= 0 ? '' : `${bannerHeight * (1 - shrinkAmount)}px`;
            banner.style.opacity = shrinkAmount <= 0 ? '' : 1 - shrinkAmount;
        }
    }
    
    lastScrollTop = scrollTop;
});

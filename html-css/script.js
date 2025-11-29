// Check login status and update UI
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userButton = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');
    const userName = document.getElementById('userName');
    
    if (token && user.id) {
        // User is logged in - show dropdown functionality
        
        // Display user name
        if (userName && user.hoTen) {
            userName.textContent = user.hoTen;
            userName.style.display = 'inline';
        }
        
        if (userButton) {
            userButton.addEventListener('click', function(e) {
                e.preventDefault();
                userDropdown.classList.toggle('show');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (userDropdown && !e.target.closest('.user-menu-wrapper')) {
                userDropdown.classList.remove('show');
            }
        });
        
        // Handle logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Đăng xuất thành công!');
                window.location.reload();
            });
        }
    } else {
        // User is not logged in - hide dropdown and user name, redirect to login
        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
        if (userName) {
            userName.style.display = 'none';
        }
        if (userButton) {
            userButton.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }
}

// Cart utilities
function getCart() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}
function updateCartBadge() {
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) cartCountEl.textContent = String(getCartCount());
}
async function addToCartItemById(productId) {
    // Try to fetch full product details for richer cart item
    let item = { id: productId, qty: 1 };
    try {
        // First, try by ID
        let p = null;
        const idRes = await fetch('http://localhost:3000/api/products/' + encodeURIComponent(productId));
        if (idRes.ok) {
            p = await idRes.json();
        } else {
            // Fallback: search by code/name if productId is not numeric
            const searchRes = await fetch('http://localhost:3000/api/products/search?q=' + encodeURIComponent(productId));
            if (searchRes.ok) {
                const list = await searchRes.json();
                if (Array.isArray(list) && list.length) {
                    p = list[0];
                }
            }
        }
        if (p) {
            let imgPath = p.HinhAnhChinh || '';
            if (imgPath.startsWith('../')) imgPath = imgPath.substring(3);
            if (imgPath && !imgPath.startsWith('/')) imgPath = '/' + imgPath;
            item = {
                id: p.ID_SP || productId,
                qty: 1,
                name: p.TenSP || ('Sản phẩm #' + productId),
                price: Number(p.GiaBan || 0),
                image: imgPath,
                cpu: p.CPU || p.TenCPU || '',
                brand: p.TenHang || '',
                categoryId: p.ID_DM || null
            };
        }
    } catch {}

    const cart = getCart();
    const existing = cart.find(x => String(x.id) === String(productId));
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push(item);
    }
    saveCart(cart);
    updateCartBadge();
}

// Run on page load
checkLoginStatus();
updateCartBadge();

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
// Optional: demo add to cart when clicking product cards (keep badge animation)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => { cartCount.style.transform = 'scale(1)'; }, 300);
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

// Category page logic
if (window.location.pathname.includes('category.html')) {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    // Category names mapping
    const categoryNames = {
        'vga': 'VGA - Card đồ họa',
        'cpu': 'CPU - Bộ vi xử lý',
        'ram': 'RAM - Bộ nhớ',
        'ssd': 'SSD - Ổ cứng',
        'hdd': 'HDD - Ổ cứng',
        'mainboard': 'Mainboard',
        'psu': 'Nguồn máy tính',
        'case': 'Case máy tính',
        'cooling': 'Tản nhiệt',
        'monitor': 'Màn hình',
        'keyboard': 'Bàn phím',
        'mouse': 'Chuột',
        'headset': 'Tai nghe',
        'accessories': 'Phụ kiện khác'
    };

    // Brand data for each category
    const brandData = {
        'cpu': [
            { name: 'Intel', value: 'intel' },
            { name: 'AMD', value: 'amd' }
        ],
        'vga': [
            { name: 'NVIDIA', value: 'nvidia' },
            { name: 'AMD', value: 'amd' }
        ],
        'ram': [
            { name: 'Corsair', value: 'corsair' },
            { name: 'G.Skill', value: 'gskill' },
            { name: 'Kingston', value: 'kingston' },
            { name: 'Crucial', value: 'crucial' }
        ],
        'ssd': [
            { name: 'Samsung', value: 'samsung' },
            { name: 'Western Digital', value: 'wd' },
            { name: 'Crucial', value: 'crucial' },
            { name: 'Kingston', value: 'kingston' },
            { name: 'Gigabyte', value: 'gigabyte' },
            { name: 'Kioxia', value: 'kioxia' }
        ],
        'hdd': [
            { name: 'Seagate', value: 'seagate' },
            { name: 'Western Digital', value: 'wd' },
            { name: 'Toshiba', value: 'toshiba' }
        ],
        'mainboard': [
            { name: 'ASUS', value: 'asus' },
            { name: 'MSI', value: 'msi' },
            { name: 'Gigabyte', value: 'gigabyte' },
            { name: 'ASRock', value: 'asrock' }
        ],
        'psu': [
            { name: 'Corsair', value: 'corsair' },
            { name: 'Cooler Master', value: 'coolermaster' },
            { name: 'Seasonic', value: 'seasonic' },
            { name: 'EVGA', value: 'evga' }
        ],
        'case': [
            { name: 'NZXT', value: 'nzxt' },
            { name: 'Corsair', value: 'corsair' },
            { name: 'Cooler Master', value: 'coolermaster' },
            { name: 'Lian Li', value: 'lianli' }
        ],
        'cooling': [
            { name: 'Noctua', value: 'noctua' },
            { name: 'Cooler Master', value: 'coolermaster' },
            { name: 'be quiet!', value: 'bequiet' },
            { name: 'Corsair', value: 'corsair' }
        ],
        'monitor': [
            { name: 'ASUS', value: 'asus' },
            { name: 'LG', value: 'lg' },
            { name: 'Samsung', value: 'samsung' },
            { name: 'Dell', value: 'dell' },
            { name: 'AOC', value: 'aoc' }
        ],
        'keyboard': [
            { name: 'Logitech', value: 'logitech' },
            { name: 'Razer', value: 'razer' },
            { name: 'Corsair', value: 'corsair' },
            { name: 'SteelSeries', value: 'steelseries' }
        ],
        'mouse': [
            { name: 'Logitech', value: 'logitech' },
            { name: 'Razer', value: 'razer' },
            { name: 'SteelSeries', value: 'steelseries' },
            { name: 'Corsair', value: 'corsair' }
        ],
        'headset': [
            { name: 'Logitech', value: 'logitech' },
            { name: 'Razer', value: 'razer' },
            { name: 'SteelSeries', value: 'steelseries' },
            { name: 'HyperX', value: 'hyperx' }
        ],
        'accessories': [
            { name: 'Logitech', value: 'logitech' },
            { name: 'Razer', value: 'razer' },
            { name: 'Corsair', value: 'corsair' }
        ]
    };
    
    // Sample products for each category
    const productData = {
        'cpu': [
            { name: 'Intel Core i9-14900K', price: '15,990,000₫', oldPrice: '17,500,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i9' },
            { name: 'AMD Ryzen 9 7950X', price: '14,590,000₫', oldPrice: '16,000,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+Ryzen+9' },
            { name: 'Intel Core i7-14700K', price: '11,990,000₫', oldPrice: '13,200,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i7' },
            { name: 'AMD Ryzen 7 7800X3D', price: '10,990,000₫', oldPrice: '12,000,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+Ryzen+7' },
            { name: 'Intel Core i5-14600K', price: '8,990,000₫', oldPrice: '9,800,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i5' },
            { name: 'AMD Ryzen 5 7600X', price: '7,590,000₫', oldPrice: '8,200,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+Ryzen+5' },
            { name: 'Intel Core i9-13900K', price: '14,990,000₫', oldPrice: '16,500,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i9+13th' },
            { name: 'AMD Ryzen 9 7900X', price: '12,990,000₫', oldPrice: '14,000,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+7900X' },
            { name: 'Intel Core i7-13700K', price: '10,490,000₫', oldPrice: '11,500,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i7+13th' },
            { name: 'AMD Ryzen 7 7700X', price: '9,290,000₫', oldPrice: '10,000,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+7700X' },
            { name: 'Intel Core i5-13600K', price: '7,990,000₫', oldPrice: '8,800,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i5+13th' },
            { name: 'AMD Ryzen 5 7600', price: '6,490,000₫', oldPrice: '7,000,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+7600' },
            { name: 'Intel Core i3-14100', price: '4,290,000₫', oldPrice: '4,700,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i3' },
            { name: 'AMD Ryzen 5 5600X', price: '5,490,000₫', oldPrice: '6,000,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=AMD+5600X' },
            { name: 'Intel Core i9-12900K', price: '13,990,000₫', oldPrice: '15,200,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/0071c5/ffffff?text=Intel+i9+12th' }
        ],
        'vga': [
            { name: 'RTX 4090 24GB', price: '52,990,000₫', oldPrice: '55,000,000₫', discount: '-4%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4090' },
            { name: 'RTX 4080 16GB', price: '35,990,000₫', oldPrice: '38,000,000₫', discount: '-5%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4080' },
            { name: 'RX 7900 XTX 24GB', price: '28,990,000₫', oldPrice: '31,000,000₫', discount: '-6%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+7900+XTX' },
            { name: 'RTX 4070 Ti 12GB', price: '24,990,000₫', oldPrice: '26,500,000₫', discount: '-6%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4070+Ti' },
            { name: 'RX 7900 XT 20GB', price: '24,990,000₫', oldPrice: '26,800,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+7900+XT' },
            { name: 'RTX 4070 12GB', price: '19,990,000₫', oldPrice: '21,500,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4070' },
            { name: 'RX 7800 XT 16GB', price: '17,990,000₫', oldPrice: '19,500,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+7800+XT' },
            { name: 'RTX 4060 Ti 16GB', price: '15,990,000₫', oldPrice: '17,200,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4060+Ti' },
            { name: 'RX 7700 XT 12GB', price: '14,490,000₫', oldPrice: '15,800,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+7700+XT' },
            { name: 'RTX 4060 8GB', price: '11,990,000₫', oldPrice: '12,900,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+4060' },
            { name: 'RX 7600 8GB', price: '9,990,000₫', oldPrice: '10,800,000₫', discount: '-7%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+7600' },
            { name: 'RTX 3060 12GB', price: '8,990,000₫', oldPrice: '9,800,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+3060' },
            { name: 'RX 6750 XT 12GB', price: '11,990,000₫', oldPrice: '13,000,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+6750+XT' },
            { name: 'RTX 3060 Ti 8GB', price: '10,990,000₫', oldPrice: '11,900,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/76b900/ffffff?text=RTX+3060+Ti' },
            { name: 'RX 6700 XT 12GB', price: '10,490,000₫', oldPrice: '11,500,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/ed1c24/ffffff?text=RX+6700+XT' }
        ],
        'ram': [
            { name: 'Corsair Vengeance 32GB DDR5', price: '3,990,000₫', oldPrice: '4,500,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/000000/ffcc00?text=Corsair+32GB' },
            { name: 'G.Skill Trident Z5 32GB DDR5', price: '4,290,000₫', oldPrice: '4,800,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/ff0000/ffffff?text=G.Skill+32GB' },
            { name: 'Kingston Fury 16GB DDR5', price: '1,990,000₫', oldPrice: '2,200,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Kingston+16GB' },
            { name: 'Corsair Dominator 64GB DDR5', price: '8,990,000₫', oldPrice: '9,800,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/000000/ffcc00?text=Corsair+64GB' },
            { name: 'G.Skill Trident Z5 RGB 64GB DDR5', price: '9,490,000₫', oldPrice: '10,500,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/ff0000/ffffff?text=G.Skill+64GB' },
            { name: 'Kingston Fury Beast 32GB DDR5', price: '3,690,000₫', oldPrice: '4,100,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Kingston+32GB' },
            { name: 'Corsair Vengeance RGB 32GB DDR5', price: '4,290,000₫', oldPrice: '4,700,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffcc00?text=Corsair+RGB+32GB' },
            { name: 'G.Skill Trident Z5 16GB DDR5', price: '2,190,000₫', oldPrice: '2,500,000₫', discount: '-12%', img: 'https://via.placeholder.com/250x200/ff0000/ffffff?text=G.Skill+16GB' },
            { name: 'Kingston Fury 8GB DDR5', price: '990,000₫', oldPrice: '1,200,000₫', discount: '-18%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Kingston+8GB' },
            { name: 'Corsair Vengeance 16GB DDR5', price: '2,090,000₫', oldPrice: '2,300,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffcc00?text=Corsair+16GB' },
            { name: 'G.Skill Ripjaws 32GB DDR4', price: '2,490,000₫', oldPrice: '2,800,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/ff0000/ffffff?text=Ripjaws+32GB' },
            { name: 'Kingston HyperX 16GB DDR4', price: '1,290,000₫', oldPrice: '1,500,000₫', discount: '-14%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=HyperX+16GB' },
            { name: 'Corsair Vengeance LPX 32GB DDR4', price: '2,690,000₫', oldPrice: '3,000,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/000000/ffcc00?text=LPX+32GB' },
            { name: 'G.Skill Trident Z 16GB DDR4', price: '1,490,000₫', oldPrice: '1,700,000₫', discount: '-12%', img: 'https://via.placeholder.com/250x200/ff0000/ffffff?text=Trident+16GB' },
            { name: 'Kingston Fury 32GB DDR4', price: '2,390,000₫', oldPrice: '2,700,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Fury+32GB' }
        ],
        'ssd': [
            { name: 'Samsung 990 Pro 2TB NVMe', price: '5,990,000₫', oldPrice: '6,500,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/1428a0/ffffff?text=Samsung+2TB' },
            { name: 'WD Black SN850X 1TB NVMe', price: '3,290,000₫', oldPrice: '3,600,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=WD+Black+1TB' },
            { name: 'Crucial P5 Plus 1TB NVMe', price: '2,790,000₫', oldPrice: '3,100,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/c00000/ffffff?text=Crucial+1TB' },
            { name: 'Kingston KC3000 2TB NVMe', price: '5,290,000₫', oldPrice: '5,800,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Kingston+2TB' },
            { name: 'Samsung 980 Pro 1TB NVMe', price: '3,490,000₫', oldPrice: '3,900,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/1428a0/ffffff?text=Samsung+1TB' },
            { name: 'WD Black SN770 2TB NVMe', price: '4,990,000₫', oldPrice: '5,500,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=WD+2TB' },
            { name: 'Crucial P3 Plus 2TB NVMe', price: '4,490,000₫', oldPrice: '5,000,000₫', discount: '-10%', img: 'https://via.placeholder.com/250x200/c00000/ffffff?text=Crucial+2TB' },
            { name: 'Kingston NV2 1TB NVMe', price: '1,990,000₫', oldPrice: '2,300,000₫', discount: '-13%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=Kingston+NV2' },
            { name: 'Samsung 870 EVO 1TB SATA', price: '2,490,000₫', oldPrice: '2,800,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/1428a0/ffffff?text=870+EVO' },
            { name: 'WD Blue 1TB SATA', price: '1,790,000₫', oldPrice: '2,000,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=WD+Blue' },
            { name: 'Crucial MX500 1TB SATA', price: '2,190,000₫', oldPrice: '2,500,000₫', discount: '-12%', img: 'https://via.placeholder.com/250x200/c00000/ffffff?text=MX500' },
            { name: 'Kingston A400 960GB SATA', price: '1,690,000₫', oldPrice: '1,900,000₫', discount: '-11%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=A400' },
            { name: 'Samsung 990 Pro 4TB NVMe', price: '11,990,000₫', oldPrice: '13,000,000₫', discount: '-8%', img: 'https://via.placeholder.com/250x200/1428a0/ffffff?text=Samsung+4TB' },
            { name: 'WD Black SN850X 2TB NVMe', price: '6,490,000₫', oldPrice: '7,100,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/000000/ffffff?text=WD+2TB' },
            { name: 'Crucial P5 Plus 2TB NVMe', price: '5,490,000₫', oldPrice: '6,000,000₫', discount: '-9%', img: 'https://via.placeholder.com/250x200/c00000/ffffff?text=Crucial+P5+2TB' }
        ]
    };
    
    // Update page title
    const titleElement = document.getElementById('categoryTitle');
    if (titleElement && category && categoryNames[category]) {
        titleElement.textContent = categoryNames[category];
    }
    
    // Load products for category
    const productList = document.getElementById('productList');
    if (productList && category && productData[category]) {
        const products = productData[category];
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">
                    <span class="current-price">${product.price}</span>
                    <span class="old-price">${product.oldPrice}</span>
                    <span class="discount">${product.discount}</span>
                </div>
            </div>
        `).join('');
    } else if (productList) {
        // Default products if no category specified
        productList.innerHTML = `
            <div class="product-card">
                <img src="https://via.placeholder.com/250x200/1a1a1a/ff0000?text=Product" alt="Product">
                <h3>Sản phẩm mẫu</h3>
                <div class="price">
                    <span class="current-price">10,000,000₫</span>
                    <span class="old-price">12,000,000₫</span>
                    <span class="discount">-17%</span>
                </div>
            </div>
        `;
    }

    // Render brand filters based on category
    function renderBrandFilters(category) {
        const brandFilterSection = document.querySelector('.filter-section:first-child .filter-options');
        if (!brandFilterSection) return;
        
        const brands = brandData[category] || [];
        
        if (brands.length === 0) {
            // No brands for this category, hide the section
            const section = brandFilterSection.closest('.filter-section');
            if (section) section.style.display = 'none';
            return;
        }
        
        // Clear existing brands
        brandFilterSection.innerHTML = '';
        
        // Add brands for this category
        brands.forEach(brand => {
            const label = document.createElement('label');
            label.className = 'filter-checkbox';
            label.innerHTML = `
                <input type="checkbox" name="brand" value="${brand.value}">
                <span>${brand.name}</span>
            `;
            brandFilterSection.appendChild(label);
        });
    }

    // Call renderBrandFilters if on category page
    if (category && brandData[category]) {
        renderBrandFilters(category);
    }

    // Filter toggle for mobile
    const filterToggle = document.getElementById('filterToggle');
    const filterContent = document.getElementById('filterContent');

    if (filterToggle && filterContent) {
        filterToggle.addEventListener('click', function() {
            filterContent.style.display = filterContent.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Filter section toggle (accordion)
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
        title.addEventListener('click', function() {
            const section = this.parentElement;
            const options = section.querySelector('.filter-options');
            const priceRange = section.querySelector('.price-range-input');
            const icon = this.querySelector('i');
            
            // Toggle collapsed class
            section.classList.toggle('collapsed');
            
            // Toggle display
            if (options) {
                if (options.style.display === 'none') {
                    options.style.display = 'flex';
                    if (priceRange) priceRange.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    options.style.display = 'none';
                    if (priceRange) priceRange.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

# 🎨 SONA Frontend

Modern, responsive e-commerce frontend for computer hardware sales, built with vanilla HTML, CSS, and JavaScript.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Pages](#pages)
- [Features](#features)
- [Styling](#styling)
- [JavaScript Modules](#javascript-modules)
- [API Integration](#api-integration)
- [Local Storage](#local-storage)

---

## 🎯 Overview

The SONA Frontend is a static website that provides a complete e-commerce shopping experience with:
- Modern, responsive UI design
- Dark theme with gradient accents
- Smooth animations and transitions
- Real-time cart updates
- User authentication flow
- Order management system

**Design Philosophy:**
- Mobile-first responsive design
- Fast loading times
- Intuitive user experience
- Accessibility considerations
- Cross-browser compatibility

---

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling (Flexbox, Grid, Animations)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Express.js** - Static file server
- **Font Awesome 6.4.0** - Icon library
- **LocalStorage API** - Client-side data persistence

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📁 Project Structure

```
frontend/
├── html-css/
│   ├── index.html           # Home page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── category.html        # Product category listing
│   ├── product.html         # Product detail page
│   ├── cart.html            # Shopping cart
│   ├── checkout.html        # Checkout page
│   ├── account.html         # User account/orders
│   ├── order-detail.html    # Order details page
│   ├── search.html          # Search results
│   ├── blog.html            # Blog/Articles
│   ├── chat.html            # Support chat
│   ├── api-docs.html        # API documentation
│   ├── api-tester.html      # API testing tool
│   ├── style.css            # Main stylesheet
│   └── script.js            # Main JavaScript
├── img/                     # Images and assets
│   ├── banner-1.png
│   ├── banner-2.png
│   ├── sona-logo.png
│   └── products/
├── server.js                # Express server
└── package.json
```

---

## 🔧 Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   Server will start at `http://localhost:8080`

4. **Access website**
   ```
   http://localhost:8080/html-css/index.html
   ```

---

## 📄 Pages

### 🏠 Home Page (`index.html`)

**Features:**
- Hero banner slider (3 slides)
- Flash sale section
- Featured products grid
- Category quick links
- Product recommendations
- Newsletter signup

**Key Elements:**
```html
<section class="hero-banner">
  <div class="banner-slider">...</div>
</section>

<section class="flash-sale">
  <div class="product-grid">...</div>
</section>

<section class="featured-products">
  <div class="product-grid">...</div>
</section>
```

---

### 🔐 Authentication Pages

#### Login (`login.html`)

**Features:**
- Username/password form
- Remember me checkbox
- Error message display
- JWT token storage
- Redirect after login

**Key Functions:**
```javascript
async function login() {
  // Validates input
  // Calls /api/auth/login
  // Stores token in localStorage
  // Redirects to home page
}
```

#### Register (`register.html`)

**Features:**
- Complete registration form
- Email validation
- Password confirmation
- Phone number validation
- Duplicate username check

**Form Fields:**
- Username (unique)
- Email (valid format)
- Password (min 6 chars)
- Full Name
- Phone Number

---

### 🛍️ Shopping Pages

#### Category Page (`category.html`)

**Features:**
- Filter by category (URL param: `?cat=cpu`)
- Product grid layout
- Quick view on hover
- Add to cart from listing
- Price formatting
- Stock status

**Categories:**
- VGA (Graphics Cards)
- CPU (Processors)
- RAM (Memory)
- SSD/HDD (Storage)
- Mainboard
- PSU (Power Supply)
- Case
- Cooling
- Monitor
- Keyboard/Mouse
- Headset
- Accessories

#### Product Detail (`product.html`)

**Features:**
- Large product images
- Product specifications
- Add to cart with quantity
- Buy now (skip cart)
- Related products
- Stock availability
- Price display

**Key Sections:**
```html
<section class="product-detail">
  <div class="product-images">...</div>
  <div class="product-info">
    <h1 class="product-name"></h1>
    <div class="product-price"></div>
    <div class="quantity-selector">...</div>
    <button class="add-to-cart">Add to Cart</button>
    <button class="buy-now">Buy Now</button>
  </div>
</section>

<section class="related-products">...</section>
```

---

### 🛒 Cart & Checkout

#### Shopping Cart (`cart.html`)

**Features:**
- View all cart items
- Update quantities
- Remove items
- Automatic total calculation
- Proceed to checkout
- Empty cart state
- Continue shopping link

**Cart Item Structure:**
```javascript
{
  ID_SP: "CPU_001",
  TenSP: "Intel Core i7",
  GiaBan: 5000000,
  SoLuong: 1,
  HinhAnhChinh: "/img/cpu-001.png"
}
```

#### Checkout (`checkout.html`)

**Features:**
- Order summary
- Shipping information form
- Contact details validation
- Order creation API call
- Success/error messages
- Order confirmation

**Form Fields:**
- Full Name
- Phone Number
- Delivery Address
- Order notes (optional)

---

### 👤 Account Pages

#### Account Dashboard (`account.html`)

**Features:**
- User information display
- Order history list
- Order status badges (color-coded)
- View order details button
- Delete pending orders
- Logout functionality

**Order Status Colors:**
- 🟡 Yellow - Pending (cho_xac_nhan)
- 🔵 Blue - Processing (dang_xu_ly)
- 🟠 Orange - Shipping (dang_giao)
- 🟢 Green - Completed (hoan_thanh)
- 🔴 Red - Cancelled (da_huy)

#### Order Detail (`order-detail.html`)

**Features:**
- Complete order information
- Order ID and date
- Recipient details
- Item list with images
- Quantities and prices
- Order total
- Status badge

**Data Display:**
```html
<div class="order-header">
  <h2>Order #DH001</h2>
  <span class="status-badge">Pending</span>
</div>

<table class="order-items">
  <tr>
    <td>Product ID</td>
    <td>Product Name</td>
    <td>Quantity</td>
    <td>Price</td>
    <td>Total</td>
  </tr>
</table>
```

---

### 🔍 Search Page (`search.html`)

**Features:**
- Search input with autocomplete
- Filter results by category
- Sort by price/name
- No results message
- Search history

---

### 📝 Blog & Support

#### Blog (`blog.html`)
- Article listings
- Categories
- Featured posts
- Read more links

#### Chat (`chat.html`)
- Support chat interface
- Message history
- Send messages
- Typing indicators

---

## ✨ Features

### 🎨 UI Components

#### Fixed Header
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
}
```

**Features:**
- Stays visible on scroll
- Logo and navigation
- Search icon (overlay)
- Cart with item count
- User menu dropdown

#### Category Sidebar
```css
.sidebar-category {
  position: absolute;
  width: 250px;
  background: #1a1a1a;
  z-index: 1001;
}
```

**Features:**
- Toggle with hamburger menu
- 14 product categories
- Icon for each category
- Hover effects
- Links to category pages

#### Search Overlay
```css
.search-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}
```

**Features:**
- Full-screen search
- Close on click outside
- Real-time search (future)
- ESC key to close

#### Cart Badge
```html
<span class="cart-count">5</span>
```

**Features:**
- Real-time update
- Red background
- Positioned on cart icon
- Hidden when empty

---

### 🛠️ JavaScript Modules

#### Authentication Module (`script.js`)

```javascript
// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    // User is logged in
    displayUserInfo();
  } else {
    // Show login button
  }
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/html-css/login.html';
}
```

#### Cart Management

```javascript
// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Add item to cart
function addToCart(product) {
  let cart = getCart();
  const existingItem = cart.find(item => item.ID_SP === product.ID_SP);
  
  if (existingItem) {
    existingItem.SoLuong++;
  } else {
    cart.push({...product, SoLuong: 1});
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart count badge
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.SoLuong, 0);
  document.querySelector('.cart-count').textContent = count;
}
```

#### Order Management

```javascript
// Create order from cart
async function createOrder(orderData) {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Clear cart
    localStorage.removeItem('cart');
    // Redirect to account page
    window.location.href = '/html-css/account.html';
  }
}

// Load user orders
async function loadOrders() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (data.success) {
    displayOrders(data.orders);
  }
}
```

---

## 🎨 Styling

### CSS Architecture

```
style.css
├── Reset & Base Styles
├── Layout Components
│   ├── Header
│   ├── Sidebar
│   ├── Footer
├── UI Components
│   ├── Buttons
│   ├── Forms
│   ├── Cards
│   ├── Badges
├── Page-Specific Styles
│   ├── Home
│   ├── Product
│   ├── Cart
│   ├── Account
└── Responsive Media Queries
```

### Design System

#### Colors
```css
:root {
  --primary-color: #ff0000;
  --dark-bg: #1a1a1a;
  --darker-bg: #000000;
  --light-bg: #f0f2f5;
  --text-dark: #333;
  --text-light: #fff;
  --border-color: #ddd;
  --success: #27ae60;
  --warning: #f39c12;
  --danger: #e74c3c;
}
```

#### Typography
```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 { font-size: 2.5em; }
h2 { font-size: 2em; }
h3 { font-size: 1.5em; }
```

#### Spacing
```css
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
```

---

### Responsive Breakpoints

```css
/* Mobile First */
/* Base styles for mobile (320px+) */

/* Tablet */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
  .product-grid { grid-template-columns: repeat(4, 1fr); }
}

/* Large Desktop */
@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
```

---

## 🔗 API Integration

### API Base URL
```javascript
const API_URL = 'http://localhost:3000/api';
```

### Making API Calls

#### With Authentication
```javascript
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  return response.json();
}
```

#### Example: Get Products
```javascript
async function loadProducts(category) {
  try {
    const response = await fetch(`${API_URL}/products?category=${category}`);
    const data = await response.json();
    
    if (data.success) {
      displayProducts(data.products);
    }
  } catch (error) {
    console.error('Error loading products:', error);
    showError('Failed to load products');
  }
}
```

---

## 💾 Local Storage

### Stored Data

```javascript
// Authentication
localStorage.setItem('token', 'jwt_token_here');
localStorage.setItem('user', JSON.stringify({
  ID_U: 'U1234567890',
  TenDN: 'username',
  Email: 'user@example.com',
  HoTen: 'Full Name'
}));

// Shopping Cart
localStorage.setItem('cart', JSON.stringify([
  {
    ID_SP: 'CPU_001',
    TenSP: 'Intel Core i7',
    GiaBan: 5000000,
    SoLuong: 1,
    HinhAnhChinh: '/img/cpu-001.png'
  }
]));

// Session Storage (for Buy Now)
sessionStorage.setItem('buyNowItem', JSON.stringify({
  ID_SP: 'CPU_001',
  TenSP: 'Intel Core i7',
  GiaBan: 5000000,
  SoLuong: 1
}));
```

### Data Persistence

**Cart Persistence:**
- Cart saved after every change
- Persists across page reloads
- Cleared after successful order
- Shared across tabs

**Auth Persistence:**
- Token stored after login
- Checked on every page load
- Removed on logout
- Expires after 24 hours (server-side)

---

## 🎯 User Flows

### Shopping Flow
```
1. Browse products (index.html or category.html)
2. Click product → View details (product.html)
3. Add to cart or Buy Now
4. View cart (cart.html)
5. Proceed to checkout (checkout.html)
6. Fill delivery info
7. Place order
8. View order confirmation (account.html)
```

### Authentication Flow
```
1. Click Login/Register
2. Fill credentials (login.html or register.html)
3. Submit form
4. Receive JWT token
5. Token stored in localStorage
6. User info displayed in header
7. Access protected features
```

---

## 🎨 Animations & Effects

### CSS Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide down */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Hover effects */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
```

### JavaScript Animations

```javascript
// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Loading spinner
function showLoading() {
  document.body.classList.add('loading');
}

function hideLoading() {
  document.body.classList.remove('loading');
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Cart count not updating

**Solution:**
```javascript
// Call updateCartCount() after cart operations
function addToCart(product) {
  // ... add to cart logic
  updateCartCount(); // ← Add this
}
```

### Issue: User not redirected after login

**Solution:**
```javascript
// Check for redirect parameter
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect') || '/html-css/index.html';
window.location.href = redirect;
```

### Issue: Token expired

**Solution:**
```javascript
// Check token validity on page load
async function validateToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}
```

---

## 📱 Mobile Optimization

### Touch Events
```javascript
// Swipe for banner slider
let startX = 0;
banner.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

banner.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});
```

### Mobile Menu
```css
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .main-nav {
    display: none;
  }
  
  .main-nav.active {
    display: flex;
    flex-direction: column;
  }
}
```

---

## 🚀 Performance Optimization

### Image Optimization
- Use WebP format with fallback
- Lazy loading for images below fold
- Responsive images with srcset
- Compress images before upload

### Code Optimization
```javascript
// Debounce search input
let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(e.target.value);
  }, 300);
});
```

### Caching Strategy
```javascript
// Service Worker (future enhancement)
// Cache static assets
// Offline support
```

---

## 📞 Support & Resources

- **API Documentation**: `http://localhost:8080/html-css/api-docs.html`
- **API Tester**: `http://localhost:8080/html-css/api-tester.html`
- **GitHub**: [WebSONA-FE Repository](https://github.com/23521354-maker/WebSONA-FE)

---

**Designed with ❤️ for the best shopping experience**

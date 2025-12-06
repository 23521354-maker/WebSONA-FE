// API Configuration
// Được sử dụng bởi tất cả các trang HTML tĩnh
// Thay đổi URL này khi deploy sang Vercel/Render

// Development
const API_URL_DEV = 'http://localhost:3000/api';

// Production (Render)
const API_URL_PROD = 'https://websona-be-3.onrender.com';

// Auto-detect environment
const API_URL = window.location.hostname === 'localhost' 
  ? API_URL_DEV 
  : API_URL_PROD;

// Xuất cho các trang sử dụng
window.API_URL = API_URL;

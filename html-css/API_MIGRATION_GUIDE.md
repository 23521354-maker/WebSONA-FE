# 🔄 Hướng Dẫn Migrate từ localhost sang window.API_URL

## 📋 Tóm Tắt

Toàn bộ frontend HTML/CSS static đã được cập nhật để dùng `window.API_URL` thay vì `http://localhost:3000/api`. Điều này cho phép deploy dễ dàng lên Vercel mà không cần thay đổi code.

---

## ✅ Status Hiện Tại

### Đã Sửa ✓
- ✅ `product.html` - Toàn bộ fetch URL cập nhật
- ✅ `config.js` - Định nghĩa `window.API_URL` chính xác

### Cần Kiểm Tra (Nếu Có)
- Các file khác không còn dùng `http://localhost:3000`

---

## 🎯 Pattern Chung Để Áp Dụng

### ❌ Trước (Sai)
```javascript
// Dòng 567 - product.html
const API_URL = 'http://localhost:3000/api';

fetch(`${API_URL}/products/${productId}`)
```

### ✅ Sau (Đúng)
```javascript
// Dùng window.API_URL từ config.js
const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';

fetch(`${apiUrl}/products/${encodeURIComponent(productId)}`)
```

---

## 📌 Quy Tắc Viết Fetch API

### 1. Luôn Sử dụng `window.API_URL`
```javascript
// ✓ ĐÚNG
const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
fetch(`${apiUrl}/endpoint`)

// ✗ SAI
fetch('http://localhost:3000/api/endpoint')
```

### 2. Encode URL Parameters
```javascript
// ✓ ĐÚNG - Encode ID sản phẩm
const productId = 'CPU_001';
fetch(`${apiUrl}/products/${encodeURIComponent(productId)}`)

// ✓ ĐÚNG - Dùng URLSearchParams
const params = new URLSearchParams();
params.append('q', 'laptop');
fetch(`${apiUrl}/products/search?${params.toString()}`)

// ✗ SAI
fetch(`${apiUrl}/products/${productId}`)  // Không encode
```

### 3. Thêm Error Handling & Logging
```javascript
async function fetchProduct(productId) {
    try {
        const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
        const endpoint = `${apiUrl}/products/${encodeURIComponent(productId)}`;
        
        // ✓ Log để debug
        console.log('[product.html] Đang tải từ:', endpoint);
        
        const response = await fetch(endpoint);
        
        // ✓ Kiểm tra status
        if (!response.ok) {
            throw new Error(`API lỗi ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('[product.html] Tải thành công:', data.ID_SP);
        return data;
        
    } catch (error) {
        // ✓ Log lỗi chi tiết
        console.error('[product.html] Lỗi khi tải:', {
            message: error.message,
            productId: productId,
            apiUrl: window.API_URL,
            stack: error.stack
        });
        
        // ✓ Hiển thị thông báo cho người dùng
        showErrorMessage('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        throw error;
    }
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'background:#fee; color:#c33; padding:15px; margin:20px 0; border-radius:8px;';
    errorDiv.textContent = message;
    document.body.insertBefore(errorDiv, document.body.firstChild);
}
```

### 4. Xử Lý Response Không Phải JSON
```javascript
// ✓ Kiểm tra content-type
const contentType = response.headers.get('content-type');
if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response không phải JSON');
}
const data = await response.json();
```

### 5. Timeout & Retry (Optional)
```javascript
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

// Sử dụng
const response = await fetchWithTimeout(`${apiUrl}/products`, {}, 10000);
```

---

## 🔍 Checklist Để Kiểm Tra Các File

Dùng pattern này để kiểm tra từng file HTML:

### Bước 1: Kiểm Tra Localhost
```bash
grep -n "http://localhost" *.html
# Kết quả: (không có = tốt)
```

### Bước 2: Kiểm Tra Import config.js
```bash
grep -n "config.js" *.html
# Kết quả: <script src="/html-css/config.js"></script>
```

### Bước 3: Kiểm Tra Fetch Syntax
Tìm từ `fetch(` và đảm bảo:
- ✓ Dùng `window.API_URL` hoặc `API_URL`
- ✓ Encode URL parameters
- ✓ Có try-catch
- ✓ Có console.log để debug

---

## 🎓 Ví Dụ Đầy Đủ

### File: category.html
```javascript
// ✓ Pattern Đúng
(function() {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('cat');
    
    async function loadCategory() {
        try {
            const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
            const endpoint = `${apiUrl}/categories/${encodeURIComponent(categoryId)}`;
            
            console.log('[category.html] Tải từ:', endpoint);
            const response = await fetch(endpoint);
            
            if (!response.ok) {
                throw new Error(`Lỗi ${response.status}`);
            }
            
            const data = await response.json();
            console.log('[category.html] Thành công');
            renderCategory(data);
            
        } catch (error) {
            console.error('[category.html] Lỗi:', error.message);
            showErrorMessage('Không thể tải danh mục');
        }
    }
    
    document.addEventListener('DOMContentLoaded', loadCategory);
})();
```

---

## 🚀 Deploy Checklist

Trước khi deploy:
- [ ] Không còn `http://localhost:3000` trong code
- [ ] `config.js` được import trước tất cả script khác
- [ ] Tất cả fetch đều dùng `window.API_URL`
- [ ] Có console.log để tracking lỗi
- [ ] Có thông báo lỗi hiển thị cho user
- [ ] Test trên localhost lẫn production URL

---

## 📞 Troubleshooting

### Q: API trả về 404
**A:** Kiểm tra:
1. Endpoint đúng không? (VD: `/products`, không phải `/product`)
2. URL parameters encode đúng không?
3. ID có tồn tại trong DB không?

### Q: CORS error
**A:** Kiểm tra backend `app.js`:
- CORS phải accept origin của Vercel: `https://sona-web.vercel.app`
- Hoặc accept tất cả origins: `*`

### Q: API_URL undefined
**A:** 
1. Kiểm tra `config.js` được import chưa
2. Dùng fallback: `window.API_URL || 'https://websona-be-3.onrender.com/api'`
3. Check browser console xem có lỗi gì không

### Q: Fetch timeout
**A:**
1. Kiểm tra kết nối internet
2. Kiểm tra backend có chạy không
3. Thêm timeout handler
4. Retry request 1-2 lần

---

## 📝 Summary

| Trước | Sau |
|-------|-----|
| `http://localhost:3000/api` | `window.API_URL` |
| Hardcoded URL | Dynamic từ config.js |
| Không encode params | `encodeURIComponent()` |
| Ít error handling | Đầy đủ try-catch + logging |
| Không user feedback | Hiển thị lỗi user-friendly |

**Result:** Codebase sạch, dễ maintain, và dễ deploy! 🎉

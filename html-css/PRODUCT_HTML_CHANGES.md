# ✅ Chi Tiết Thay Đổi product.html

## 🎯 Thay Đổi Chính

### 1️⃣ Sửa Hardcoded API_URL

**Vị trí:** Dòng 567
**Trước:**
```javascript
const API_URL = 'http://localhost:3000/api';
```

**Sau:**
```javascript
const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
```

**Lợi ích:**
- ✅ Dùng URL từ `config.js` (auto-detect dev/prod)
- ✅ Fallback nếu `window.API_URL` undefined
- ✅ Deploy lên Vercel không cần thay code

---

### 2️⃣ Thêm URLSearchParams & Encoding

**Vị trí:** Dòng 577-582
**Trước:**
```javascript
const productId = params.get('id');
// ...
fetch(`${API_URL}/products/${productId}`)
```

**Sau:**
```javascript
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
// ...
const endpoint = `${apiUrl}/products/${encodeURIComponent(productId)}`;
fetch(endpoint)
```

**Lợi ích:**
- ✅ Đúng cách sử dụng URLSearchParams
- ✅ `encodeURIComponent()` bảo vệ URL khỏi lỗi ký tự đặc biệt
- ✅ Log URL để debug dễ hơn

---

### 3️⃣ Thêm Chi Tiết Error Handling

**Vị trí:** Dòng 583-630
**Trước:**
```javascript
try {
    const res = await fetch(`${API_URL}/products/${productId}`);
    if (!res.ok) throw new Error('Không lấy được sản phẩm');
} catch (err) {
    console.error('Breadcrumb load error:', err);
}
```

**Sau:**
```javascript
try {
    const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
    const endpoint = `${apiUrl}/products/${encodeURIComponent(productId)}`;
    
    // ✅ Log chi tiết
    console.log('[product.html] Đang tải sản phẩm từ:', endpoint);
    const res = await fetch(endpoint);
    
    // ✅ Kiểm tra status
    if (!res.ok) {
        throw new Error(`API trả về lỗi ${res.status}: ${res.statusText}`);
    }
    
    const p = await res.json();
    console.log('[product.html] Sản phẩm tải thành công:', p.ID_SP);
    
    // ... xử lý dữ liệu ...
    
} catch (err) {
    // ✅ Log lỗi chi tiết
    console.error('[product.html] Lỗi khi tải sản phẩm:', {
        message: err.message,
        productId: productId,
        apiUrl: window.API_URL,
        stack: err.stack
    });
    
    // ✅ Hiển thị thông báo lỗi cho user
    bc.innerHTML = '<a href="/">Trang chủ</a> › <span>Chi tiết sản phẩm</span>';
    
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'background:#fee; color:#c33; padding:15px; margin:20px 0; border-radius:8px; text-align:center;';
    errorMsg.innerHTML = `
        <strong>⚠️ Không thể tải sản phẩm</strong><br>
        <small>${err.message || 'Vui lòng kiểm tra kết nối internet và thử lại.'}</small>
    `;
    const container = document.querySelector('.container');
    if (container) container.insertBefore(errorMsg, container.firstChild);
}
```

**Lợi ích:**
- ✅ Console logs giúp debug nhanh hơn
- ✅ User nhìn thấy lỗi chính xác, không bị "ăn" error
- ✅ Hiển thị thông báo friendly (màu đỏ, icon ⚠️)
- ✅ Tách biệt dev logs (`[product.html]`) để dễ tracking

---

### 4️⃣ Sửa loadRelatedProducts()

**Vị trí:** Dòng 543-575
**Trước:**
```javascript
async function loadRelatedProducts() {
    try {
        const response = await fetch(`${API_URL}/products?limit=8`);
        const allProducts = await response.json();
        // ...
    } catch (error) {
        console.error('Error loading related products:', error);
    }
}
```

**Sau:**
```javascript
async function loadRelatedProducts() {
    try {
        const params = new URLSearchParams(window.location.search);
        const currentProductId = params.get('id');
        const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api';
        
        console.log('[product.html] Đang tải sản phẩm liên quan từ:', apiUrl);
        const response = await fetch(`${apiUrl}/products?limit=8`);
        
        if (!response.ok) {
            throw new Error(`API lỗi: ${response.status} ${response.statusText}`);
        }
        
        const allProducts = await response.json();
        console.log('[product.html] Tải được', allProducts.length, 'sản phẩm liên quan');
        
        // ... xử lý dữ liệu ...
        
    } catch (error) {
        console.error('[product.html] Lỗi tải sản phẩm liên quan:', {
            message: error.message,
            apiUrl: window.API_URL,
            stack: error.stack
        });
        // Không hiển thị lỗi - chỉ để trống phần sản phẩm liên quan
    }
}
```

**Lợi ích:**
- ✅ Dùng `window.API_URL` chính xác
- ✅ Kiểm tra `response.ok` bắt buộc
- ✅ Log số lượng sản phẩm tải được
- ✅ Graceful error handling (không ảnh hưởng UI)

---

## 📋 Tóm Tắt Thay Đổi

| Đặc Điểm | Trước | Sau |
|---------|-------|-----|
| API URL | Hardcoded `http://localhost:3000` | Dynamic `window.API_URL` |
| URL Encoding | Không | ✅ `encodeURIComponent()` |
| Error Messages | Vague | Chi tiết + user-friendly |
| Console Logs | Tối thiểu | [product.html] prefix |
| Response Check | Chỉ JSON | JSON + status code |
| User Feedback | Không | ✅ Hiển thị error box |

---

## 🧪 Testing

### Local (localhost:8000)
```
config.js → API_URL_DEV → https://websona-be-3.onrender.com/api ✓
```

### Production (Vercel)
```
config.js → API_URL_PROD → https://websona-be-3.onrender.com/api ✓
```

### Kiểm Tra Console
```javascript
// Mở DevTools (F12) → Console
console.log(window.API_URL)
// Kết quả: https://websona-be-3.onrender.com/api ✓
```

### Kiểm Tra Network
1. Mở DevTools → Network
2. Tải trang product
3. Tìm request đến `/api/products/...`
4. Kiểm tra URL có đúng không

---

## 🚀 Pattern Để Áp Dụng Cho File Khác

Nếu có file HTML khác dùng localhost:

```javascript
// Bước 1: Thay API_URL
- const API_URL = 'http://localhost:3000/api'
+ const apiUrl = window.API_URL || 'https://websona-be-3.onrender.com/api'

// Bước 2: Encode params
- fetch(`${apiUrl}/endpoint/${id}`)
+ fetch(`${apiUrl}/endpoint/${encodeURIComponent(id)}`)

// Bước 3: Thêm error handling
+ if (!response.ok) throw new Error(...)
+ console.log('[filename.html] ...')

// Bước 4: Hiển thị lỗi user
+ const errorDiv = document.createElement('div')
+ errorDiv.style.cssText = '...'
+ document.body.insertBefore(errorDiv, ...)
```

---

## 💡 Debugging Tips

### Issue: API trả về 404
```javascript
// Check console log
[product.html] Đang tải sản phẩm từ: https://websona-be-3.onrender.com/api/products/CPU_001

// Lấy URL từ console, paste vào browser
// → Xem API response trực tiếp
```

### Issue: CORS error
```
Access to fetch at 'https://...' from origin 'https://sona.vercel.app' 
has been blocked by CORS policy
```
→ Cần sửa backend `app.js` CORS config

### Issue: window.API_URL undefined
```javascript
// Check config.js loaded
console.log(window.API_URL)
// undefined → config.js chưa load

// Fix: Đảm bảo order
// <script src="/html-css/config.js"></script>  ← trước
// <script src="/html-css/script.js"></script>   ← sau
```

---

## ✨ Result

✅ `product.html` giờ:
- Không còn hardcoded localhost
- Dùng dynamic API URL từ config.js
- Có xử lý lỗi toàn diện
- Ghi log chi tiết để debug
- Hiển thị lỗi friendly cho user
- Ready để deploy!

const SUPABASE_URL = "https://lygbbvfavirzviylugpy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Z2JidmZhdmlyenZpeWx1Z3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjc1MDMsImV4cCI6MjA5Njk0MzUwM30.1XAoOgiXu2XgbpgSRQDYNZIQWPxcAi-RQ0DjEU7Ec9U"

async function saveOrderToSupabase(order) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({ data: order })
        });
        if (!res.ok) return false;
        return true;
    } catch(e) {
        return false;
    }
}


// تابع کمکی برای نمایش قیمت (اضافه کردن فاصله و "هزار")
function formatPrice(p) {
    // اگر خالی یا undefined باشه, رشته خالی برگردون
    if (!p && p !== 0) return "";
    return Number(p * 1000).toLocaleString('fa-IR') + " تومان";
}

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout ( () => {
        toast.classList.remove("show");
    }, 2000);
}

// =============== سبد خرید ==============
let cart = [];

// بارگذاری سبد از localStorage
function loadCart() {
    const saved = sessionStorage.getItem('cafeCart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch(e) { cart = []; }
    } else {
        cart = [];
    }
    updateCartUI();
}

// ذخیره سبد در localStorage
function saveCart() {
    sessionStorage.setItem('cafeCart', JSON.stringify(cart));
    updateCartUI();
}

// افزودن محصول به سبد (یا افزایش تعداد
function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            quantity: 1,
            image: product.image || '',
            desc: product.desc || ''
        });
    }
    saveCart();

    showToast(` ${product.name} به سبد خرید اضافه شد`);
}

// تغییر تعداد
function updateQuantity(name, delta) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        const newQty = cart[index].quantity + delta;
        if (newQty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = newQty;
        }
        saveCart();
    }
}

// حذف یک آیتم
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();

    showToast("آیتم حذف شد");
}

// خالی کردن کامل سبد خرید
function clearCart() {
    cart = [];
    saveCart();

    showToast("سبد خرید خالی شد");
}

// به روز رسانی UI (آیکون سبد و تعداد)
function updateCartUI() {
    const cartCountSpan = document.getElementById('cartCount');
    if (cartCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }
    renderCartModal(); // باز رندر مودال سبد اگر باز باشد
}

// نمایش سبد در مودال
function renderCartModal() {
    const cartList = document.getElementById('cartItemsList');
    const cartTotalSpan = document.getElementById('cartTotal');
    if (!cartList) return;
    if (cart.length === 0) {
        cartList.innerHTML = '<div style="text-align:center; padding:20px;">سبد خرید شما خالی است</div>';
        if (cartTotalSpan) cartTotalSpan.textContent = '0';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item" data-name="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} هزار تومان</div>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-minus" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-plus" data-name="${item.name}">+</button>
                    <button class="remove-item-btn" data-name="${item.name}">&#x1F5D1;&#xFE0F;</button>
                </div>
            </div>
        `;
    });
    cartList.innerHTML = html;
    if (cartTotalSpan) cartTotalSpan.textContent = total;

    // اتصال رویدادها به دکمه های داخل مودال
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name;
            updateQuantity(name, -1);
        });
    });
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name;
            updateQuantity(name, 1);
        });
    });
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            removeItem(name);
        });
    });
}

// باز کردن مودال سبد
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        renderCartModal();
        modal.style.display = 'flex';
        // اضافه کردن blur به main-content (اختیاری)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.classList.add('blur');
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.classList.remove('blur');
    }
}

// ثبت سفارش 
async function checkout() {
    const location = document.getElementById("orderLocation").value;
    const tableNumber = document.getElementById("tableNumber").value;
    const note = document.getElementById("orderNote").value;

    if (!location){
        alert("محل سفارش را انتخاب کنید");
        return;
    }

    if (location === "سالن" && !tableNumber) {
        alert("لطفا شماره میز را وارد کنید");
        return;
    }

    if (cart.length === 0) {
        alert('سبد خرید خالی است!');
        return;
    }
    let message = `سفارش جدید\n\nمحل: ${location}\n`;
    if (location === "سالن") {
        message += `میز: ${tableNumber}\n`;
    }

    message += "\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ${item.price * item.quantity} هزار تومان\n`;
    });

    if (note) {
        message += `\nیادداشت: \n${note}\n`;
    }
    const total = cart.reduce((s,i) => s + (i.price * i.quantity), 0);
    message += `\nجمعکل: ${total} هزار تومان`;

    const order = {
        id: Date.now(),
        createdAt: Date.now(),
        location,
        tableNumber,
        note,
        items: [...cart],
        total,
        time: new Date().toLocaleString('fa-IR'),
        createAt: Date.now(),
        status: "در انتظار"
    };

    const success = await saveOrderToSupabase(order);
    if (!success) {
        showToast("خطا در ثبت سفارش");
        return;
    }

    showToast("سفارش با موفقیت ثبت شد")

    cart = [];

    updateCartUI();

    sessionStorage.removeItem("cafeCart");

    document.getElementById("orderNote").value = "";

    document.getElementById("orderLocation").value = "";

    document.getElementById("tableNumber").value = "";

    document.getElementById("tableSelector").style.display = "none";
    // میتوانید با واتساپ یا ایمیل نیز یکپارچه کنید
    // window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
}

// راه اندازی رویدادهای سبد
function initCart() {
    loadCart();
    const CartIcon = document.getElementById('cartIcon');
    if (CartIcon) CartIcon.addEventListener('click', openCartModal);
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartModal);
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => { clearCart(); });
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    //بستن مودال با کلیک بیرون
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) closeCartModal();
    });
}

// ============== بخش ویژه های کافه ===============
function renderFeaturedItems() {
    const featuredContainer = document.getElementById('featured-items-container');
    const featuredSection = document.getElementById('featured-section');
    if (!featuredContainer) return;

    // جمع آوری تمام آیتم های ویژه از دیتا
    let featuredProducts = [];
    menu.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
            category.items.forEach(item => {
                if (item.featured === true) {
                    featuredProducts.push(item);
                }
                // همچنین چک کردن آیتم های دارای سایز (اگر در آینده featured برای سایزها بخواهید)
                if (item.sizes && Array.isArray(item.sizes)) {
                    item.sizes.forEach(size => {
                        if (size.featured === true) {
                            featuredProducts.push({
                                ...size,
                                name: `${item.name} - ${size.size}`
                            });
                        }
                    });
                }
            });
        }
    });

    if (featuredProducts.length === 0) {
        if (featuredSection) featuredSection.style.display = 'none';
        return;
    }

    // نمایش بخش ویژه
    if (featuredSection) featuredSection.style.display = 'block';
    featuredContainer.innerHTML = '';

    // ساخت کارت ها
    featuredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('featured-card');
        // ذخیره اطلاعات در data attributes برای مودال
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.desc = product.description || 'محصول ویژه کافه ژوان';
        card.dataset.image = product.image || '';

        let imgHtml = '';
        if (product.image) {
            imgHtml = `<img src="${product.image}" alt="${product.name}">`;
        } else {
            imgHtml = `<div style="height:130px; background:#e0d5c0; border-radius:20px; display:flex; align-items:center; justify-content:center; font-size:12px; color:#8b6946;">بدون عکس</div>`;
        }
        const priceText = product.price ? formatPrice(product.price) : '';
        card.innerHTML = `
            ${imgHtml}
            <div class="featured-name">${product.name}</div>
            <div class="featured-price">${priceText}</div>
        `;
        // رویداد کلیک برای باز کردن مودال
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal({
                name: product.name,
                price: product.price,
                desc: product.description || 'محصول ویژه',
                image: product.image || ''
            });
        });
        featuredContainer.appendChild(card);
    });
}

function initModalElements() {

    modal = document.getElementById('productModal');
    modalImg = document.getElementById('modal-img');
    modalName = document.getElementById('modal-name');
    modalPrice = document.getElementById('modal-price');
    modalDesc = document.getElementById('modal-desc');
    closeBtn = document.querySelector('.close');
    mainContent = document.querySelector('.main-content');

    if (closeBtn) closeBtn.onclick = closeModal;
    window.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}


function openModal(product) {
    if (!modalName || !modalPrice || !modalDesc) {
        initModalElements();
    }
    if (!modalName || !modalPrice || !modalDesc) {
        console.error("Modal elements not found!");
    }

    modalName.textContent = product.name;
    // نمایش قیمت به همان فرمتی که در منو هست (مثلا ۶۵ هزار)
    let priceDisplay = product.price ? formatPrice(product.price) : "نامشخص";
    modalPrice.textContent = priceDisplay;
    modalDesc.textContent = product.desc || "بدون توضیحات";
    const addBtn = document.getElementById("addToCartBtn");

    if (addBtn) {
        addBtn.onclick = () => {

            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                desc: product.desc
            });

            console.log(product);

            closeModal();
        };
    }

    if (modalImg) {
        if (product.image && product.image !== "") {
            modalImg.src = product.image;
            modalImg.style.display = "block";
        } else {
            modalImg.style.display = "none"; // اگر تصویر نبود تصویر را مخفی کن
        }
    }
    
    if (modal) modal.style.display = 'flex';
    if (mainContent) mainContent.classList.add('blur');
}

function closeModal() {
    if (modal) modal.style.display = 'none';
    if (mainContent) mainContent.classList.remove('blur');
}


function handleItemClick(event) {
    // جلوگیری از باز شدن مودال اگر روی دکمه یا جای خاصی کلیک شده (در آینده)
    const itemDiv = event.currentTarget;
    const name = itemDiv.dataset.name;
    const price = itemDiv.dataset.price;
    const desc = itemDiv.dataset.desc;
    const image = itemDiv.dataset.image;
    const id = itemDiv.dataset.id;

    if (!name) return; // اگر data-name نداشت, ignore

    openModal({ name, price, desc, image, id});
}

function attachModalClickEvents() {
    const allItems = document.querySelectorAll(".menu-item");
    allItems.forEach(item => {
        // برای جلوگیری از چندبار اضافه شدن, قبلا لیستنر نداشته باشد
        item.removeEventListener("click", handleItemClick);
        item.addEventListener("click", handleItemClick);
    });
}

console.log("menu:", menu);

const menuContainer = document.getElementById("menu-container");
const navContainer = document.getElementById("category-nav");
const headerEl = document.querySelector(".header");
const navEl = document.querySelector(".category-nav");


menu.forEach((section, index) => {

    // ساخت سکشن
    const sectionDiv = document.createElement("section");

    sectionDiv.classList.add("menu-section");
    sectionDiv.id = "section" + index;

    const title = document.createElement("h2");
    title.textContent = section.category;
    sectionDiv.appendChild(title);

    // ساخت آیتم ها
    if (Array.isArray(section.items)) {
        section.items.forEach(item => {

            // اگر آیتم سایز داره (مثل چایی ساده)
            if (item.sizes && Array.isArray(item.sizes)) {

                // نمایش نام آیتم به عنوان sub-title
                const nameRow = document.createElement("div");

                nameRow.classList.add("menu-category-title");
                nameRow.innerHTML = `<span>${item.name}</span><span class="price"></span>`;
                sectionDiv.appendChild(nameRow);

                // برای هر سایز یک ردیف جدا میسازیم
                item.sizes.forEach(size => {
                    const sizeDiv = document.createElement("div");

                    sizeDiv.classList.add("menu-item");
                    sizeDiv.innerHTML = `<span>${size.size}</span><span class="price">${formatPrice(size.price)}</span>`;
                    sizeDiv.dataset.name = `${item.name} - ${size.size}`;
                    sizeDiv.dataset.price = size.price;
                    sizeDiv.dataset.desc = item.description || "سایزهای مختلف";
                    sizeDiv.dataset.image = item.image || "";
                    sizeDiv.dataset.id = `${section.category}-${item.name}-${size.size}`
                    sectionDiv.appendChild(sizeDiv);
                });
            } else {
                // آیتم ساده با قیمت مستقیم 
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("menu-item");

                // ذخیره اطلاعات محصول در data attributes
                itemDiv.dataset.name = item.name;
                itemDiv.dataset.price = item.price;
                itemDiv.dataset.desc = item.description || "تویحاتی ثبت نشده";
                itemDiv.dataset.image = item.image || ""; // اگر تصویر نباشد, خالی
                itemDiv.dataset.id = `${section.category}-${item.name}`;

                // ساختار HTML آیتم

                let imgHtml ="";
                if (item.image) {
                    imgHtml = `<img class="item-img" src="${item.image}" alt="${item.name}">`;
                }
                const priceText = item.price ? formatPrice(item.price) : "";
                itemDiv.innerHTML = `
                    ${imgHtml}
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">${priceText}</div>
                    </div>
                `;
                sectionDiv.appendChild(itemDiv);
            }
        });
    }

    // اضافه کردن سکشن به کانتینر اصلی
    menuContainer.appendChild(sectionDiv);

    // ساخت دکمه دسته بندی در ناوبار
    const btn = document.createElement("button");
    btn.textContent = section.category;

    // offset
    btn.addEventListener("click", () => {
        const headerHeight = (headerEl ? headerEl.offsetHeight : 0) + (navEl ? navEl.offsetHeight : 0);
        const top = sectionDiv.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // 8px padding
        window.scrollTo({ top, behavior:"smooth" });
    });
    navContainer.appendChild(btn);
});

// ================== جست و جوی زنده =================
const searchInput = document.getElementById('liveSearch');
const searchResultsBox = document.getElementById('searchResults');
let productsList = []; // برای نگهداری رفرنس همه آیتم ها

// جمع آوری تمام محصولات از DOM (با اطلاعات لازم)
function collectProductsData() {
    const items = document.querySelectorAll('.menu-item');
    productsList = [];
    items.forEach(item => {
        const name = item.dataset.name || item.querySelector('.item-name')?.textContent || '';
        const price = item.dataset.price;
        const image = item.dataset.image || '';
        const desc = item.dataset.desc || '';
        // ذخیره رفرنس به خود آیتم برای اسکرول با کلیک
        productsList.push({ 
            id: item.dataset.id,
            name,
            price,
            image,
            desc,
            element: item    
        });
    });
}

// نمایش نتایج باکس
function showSearchResults(searchTerm) {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") {
        searchResultsBox.style.display = "none";
        return;
    }

    const filtered = productsList.filter(p => p.name.toLowerCase().includes(term));
    if (filtered.length === 0) {
        searchResultsBox.innerHTML = `<div class="no-result"> محصولی یافت نشد </div>`;
        searchResultsBox.style.display = "block";
        return;
    }

    // ساخت HTML نتایج 
    let html = '';
    filtered.forEach(product => {
        const priceText = product.price ? formatPrice(product.price) : '';
        html += `
            <div class="search-result-item" data-product-name="${product.name}">
                ${product.image ? `<img class="search-result-img" src="${product.image}" alt="${product.name}">` : '<div style="width:40px"></div>'}
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    <div class="search-result-price">${priceText}</div>
                </div>
            </div>
        `;
    });
    searchResultsBox.innerHTML = html;
    searchResultsBox.style.display = "block";

    // افزودن رویداد کلیک به هر نتیجه
    document.querySelectorAll('.search-result-item').forEach(resultDiv => {
        resultDiv.addEventListener('click', () => {
            const productName = resultDiv.dataset.productName;
            const product = productsList.find(p => p.name === productName);
            if (product) {
                // بستن باکس نتایج
                searchResultsBox.style.display = "none";
                searchInput.value = "";
                // باز کردن مودال همان محصول
                openModal({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    desc: product.desc,
                    image: product.image
                });
                // همچنین میتوانید به آن آیتم در صفحه اسکرول کنید:
                // product.element.scrollIntoView({behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// رویداد تایپ در جستجو
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        showSearchResults(e.target.value);
    });
    // بستن باکس با کلیک بیرون
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResultsBox.contains(e.target)) {
            searchResultsBox.style.display = "none";
        }
    });
}

// بعد از رندر منو, داده ها را جمع آوری کن
// (در همان جایی که attachModalClickEvents صدا زده میشود, این را هم اضافه کنید)


initModalElements();
attachModalClickEvents();
collectProductsData();
renderFeaturedItems();
initCart();

// ============== دکمه بازگشت به بالا ================
const scrollBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// -------------- انیمیشن هنگام اسکرول (IntersectionObserver) -----------------

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.12
});

// شروع مشاهده روی تمام آیتم ها ) بعد از اینکه DOM ساخته شد )

document.querySelectorAll(".menu-item").forEach(item => {
    observer.observe(item);
});

const navButtons = document.querySelectorAll("#category-nav button");
const menuSections = document.querySelectorAll(".menu-section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const sectionId = entry.target.id;

            const index = sectionId.replace("section", "");

            navButtons.forEach(btn => btn.classList.remove("active"));

            if (navButtons[index]) {
                navButtons[index].classList.add("active");

                navButtons[index].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                });
            }
        }
    });
}, {

    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
});

menuSections.forEach(section => {
    sectionObserver.observe(section);
});


const orderLocation = document.getElementById("orderLocation");
const tableSelector = document.getElementById("tableSelector");

if(orderLocation) {
    orderLocation.addEventListener("change", () => {
        if(orderLocation.value === "سالن" || orderLocation.value === "فضای باز"){
            tableSelector.style.display = "block";
        } else {
            tableSelector.style.display = "none";
        }
    });
}


(function autoDetectTableFromQR() {
    const params = new URLSearchParams(window.location.search);
    const tableFromQR = params.get("table");

    if (!tableFromQR) return;

    const tableNumberSelect = document.getElementById("tableNumber");
    if (!orderLocation || !tableSelector || !tableNumberSelect) return;

    const validOption = Array.from(tableNumberSelect.options).some(opt => opt.value === tableFromQR);

    if (!validOption) return;

    const locationFromQR = params.get("location");
    orderLocation.value = (locationFromQR === "outdoor") ? "فضای باز" : "سالن";
    tableSelector.style.display = "block";
    tableNumberSelect.value = tableFromQR;
})();
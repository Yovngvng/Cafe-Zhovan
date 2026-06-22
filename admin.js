const ADMIN_PASSWORD = "Zhovan0605";

function checkLogin() {
    return sessionStorage.getItem("adminAuth") === "true";
}

function showAdmin() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    if (checkLogin()) {
        showAdmin();
    }

    document.getElementById("loginBtn").addEventListener("click", () => {
        const pass = document.getElementById("passwordInput").value;
        if (pass === ADMIN_PASSWORD) {
            sessionStorage.setItem("adminAuth", "true");
            showAdmin();
        } else {
            document.getElementById("loginError").style.display = "block";
        }
    });

    document.getElementById("passwordInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("loginBtn").click();
    });
});

const SUPABASE_URL = "https://lygbbvfavirzviylugpy.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Z2JidmZhdmlyenZpeWx1Z3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjc1MDMsImV4cCI6MjA5Njk0MzUwM30.1XAoOgiXu2XgbpgSRQDYNZIQWPxcAi-RQ0DjEU7Ec9U"
let currentFilter = "all";

function timeAgo(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 60000);
    if (diff < 1) return "همین الان";
    if (diff < 60) return `${diff} دقیقه پیش`;
}

async function fetchOrders() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=id.desc`, {
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY} `
        }
    });
    const rows = await res.json();
    return rows.map(r => r.data);
}

async function updateOrder(orderId, newStatus) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=id,data` , {
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });
    const rows = await res.json();
    const row = rows.find(r => r.data && r.data.id === orderId);
    if (!row) return;

    await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${row.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ data: { ...row.data, status: newStatus } })
    });
}
async function deleteOrder(orderId) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=id,data`, {
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });
    const rows = await res.json();
    const row = rows.find(r => r.data && r.data.id === orderId);
    if (!row) return;

    await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${row.id}`, {
        method: "DELETE",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });
}

let lastOrderCount = 0;

function playNotification() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
}

async function checkNewOrders() {
    const orders = await fetchOrders();
    const pending = orders.filter( o => o.status === "در انتظار").length;
    if (lastOrderCount > 0 && pending > lastOrderCount) {
        playNotification();
    }
    lastOrderCount = pending;
}

setInterval(checkNewOrders, 5000);


document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderOrders();
    });
});


async function renderOrders() {
    const container = document.getElementById("ordersContainer");

    const orders = await fetchOrders();
    let filteredOrders = currentFilter === "all" ? orders : orders.filter(o => o.status === currentFilter);

    document.getElementById("todayOrders").textContent = orders.length;
    document.getElementById("todaySales").textContent = Number(orders.reduce((s, o) => s + (o.total || 0), 0) * 1000).toLocaleString('fa-IR');
    document.getElementById("pendingCount").textContent = orders.filter(o => o.status === "در انتظار").length;
    document.getElementById("readyCount").textContent = orders.filter(o => o.status === "آماده شد").length;
    document.getElementById("doneCount").textContent = orders.filter(o => o.status === "تحویل داده شد").length;

    container.innerHTML = "";

    if (filteredOrders.length === 0) {
        container.innerHTML = "<p>هنوز سفارشی ثبت نشده</p>";
        return;
    }

    filteredOrders.forEach(order => {
        const div = document.createElement("div");
        div.className = "order";
        div.innerHTML = `
            <h3>سفارش #${order.id}</h3>
            <p>زمان: ${order.time} (${timeAgo(order.createdAt)})</p>
            <p>محل: ${order.location} ${order.tableNumber ? '- میز ' + order.tableNumber : ''}</p>
            <p>جمع کل: ${Number(order.total * 1000).toLocaleString('fa-IR')}  تومان</p>
            <p>یادداشت: ${order.note || "-"}</p>
            <p>وضعیت: <strong>${order.status}</strong></p>
            <hr>
            ${order.items.map(i => `<div>${i.name} x ${i.quantity}</div>`).join("")}
            <br>
            <button class="ready-btn" data-id="${order.id}">آماده شد</button>
            <button class="done-btn" data-id="${order.id}">تحویل داده شد</button>
            <button class="delete-btn" data-id="${order.id}">حذف</button>
        `;
        container.appendChild(div);
    });
}

document.addEventListener("click", async (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("ready-btn")) {
        await updateOrder(id, "آماده شد");
        renderOrders();
    }
    if (e.target.classList.contains("done-btn")) {
        await updateOrder(id, "تحویل داده شد");
        renderOrders();
    }
    if (e.target.classList.contains("delete-btn")) {
        await deleteOrder(id);
        renderOrders();
    }
});

document.getElementById("clearDoneOrders").addEventListener("click", async () => {
    const orders = await fetchOrders();
    const done = orders.filter(o => o.status === "تحویل داده شد");
    for (const order of done) {
        await deleteOrder(order.id);
    }
    renderOrders();
});

renderOrders();
setInterval(renderOrders, 5000);
const SUPABASE_URL = "https://lygbbvfavirzviylugpy.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Z2JidmZhdmlyenZpeWx1Z3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjc1MDMsImV4cCI6MjA5Njk0MzUwM30.1XAoOgiXu2XgbpgSRQDYNZIQWPxcAi-RQ0DjEU7Ec9U"

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

async function renderOrders() {
    const container = document.getElementById("ordersContainer");

    const orders = await fetchOrders();

    document.getElementById("todayOrders").textContent = orders.length;
    document.getElementById("todaySales").textContent = orders.reduce((s, o) => s + (o.total || 0), 0);
    document.getElementById("pendingCount").textContent = orders.filter(o => o.status === "در انتظار").length;
    document.getElementById("readyCount").textContent = orders.filter(o => o.status === "آماده شد").length;
    document.getElementById("doneCount").textContent = orders.filter(o => o.status === "تحویل داده شد").length;

    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML = "<p>هنوز سفارشی ثبت نشده</p>";
        return;
    }

    orders.forEach(order => {
        const div = document.createElement("div");
        div.className = "order";
        div.innerHTML = `
            <h3>سفارش #${order.id}</h3>
            <p>زمان: ${order.time}</p>
            <p>محل: ${order.location} ${order.tableNumber ? '- میز ' + order.tableNumber : ''}</p>
            <p>جمع کل: ${order.total} هزار تومان</p>
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
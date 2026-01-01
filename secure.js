/* ================== CONFIG ================== */
const LINK4M = "https://link4m.com/8FxTihW"; // ← THAY LINK
const EXPIRE = 48 * 60 * 60 * 1000;
const SALT = "WARVN_SECRET_123";

/* ================== ANTI DEVTOOLS ================== */
setInterval(() => {
    if (window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160) {
        localStorage.clear();
        location.href = LINK4M;
    }
}, 1000);

document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = e => {
    if (e.keyCode === 123 || (e.ctrlKey && e.keyCode === 85)) {
        location.href = LINK4M;
    }
};

/* ================== UTILS ================== */
const encode = t => btoa(t + SALT);
const decode = t => atob(t).replace(SALT, "");

const now = Date.now();

/* ================== REFERRER CHECK ================== */
if (!document.referrer.includes("link4m")) {
    location.href = LINK4M;
}

/* ================== STORAGE ================== */
let data = JSON.parse(localStorage.getItem("SECURE_KEY"));

if (!data) {
    const key = "KEY-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    data = {
        k: encode(key),
        t: now,
        last: now
    };
    localStorage.setItem("SECURE_KEY", JSON.stringify(data));
    location.reload();
}

/* ================== TIME CHEAT CHECK ================== */
if (now < data.last) {
    localStorage.clear();
    location.href = LINK4M;
}

data.last = now;
localStorage.setItem("SECURE_KEY", JSON.stringify(data));

/* ================== EXPIRE ================== */
if (now - data.t > EXPIRE) {
    localStorage.clear();
    location.href = LINK4M;
}

/* ================== DISPLAY ================== */
document.getElementById("msg").innerText = "Key hợp lệ!";
document.getElementById("data").classList.remove("hide");
document.getElementById("key").innerText = decode(data.k);

function timer() {
    let left = EXPIRE - (Date.now() - data.t);
    if (left <= 0) {
        localStorage.clear();
        location.href = LINK4M;
    }
    let h = Math.floor(left / 3600000);
    let m = Math.floor(left % 3600000 / 60000);
    let s = Math.floor(left % 60000 / 1000);
    document.getElementById("time").innerText = `${h}h ${m}m ${s}s`;
}
setInterval(timer, 1000);
timer();

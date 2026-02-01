const heartsEl = document.getElementById("hearts");
const sparklesEl = document.getElementById("sparkles");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const toast = document.getElementById("toast");

function createHearts(count = 18) {
    for (let i = 0; i < count; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.style.left = `${Math.random() * 100}vw`;
        h.style.animationDuration = `${7 + Math.random() * 7}s`;
        h.style.animationDelay = `${-Math.random() * 10}s`;
        h.style.setProperty("--s", (0.7 + Math.random() * 1.4).toFixed(2));
        heartsEl.appendChild(h);
    }
}

function makeSparks(x, y, n = 22) {
    for (let i = 0; i < n; i++) {
        const s = document.createElement("div");
        s.className = "spark";
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.setProperty(
            "--dx",
            `${(Math.random() * 260 - 130).toFixed(0)}px`,
        );
        s.style.setProperty(
            "--dy",
            `${(Math.random() * 260 - 130).toFixed(0)}px`,
        );
        sparklesEl.appendChild(s);
        setTimeout(() => s.remove(), 950);
    }
}

function celebrateYes() {
    toast.style.display = "block";

    const rect = yesBtn.getBoundingClientRect();
    makeSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);

    yesBtn.textContent = "YAY!!! 💖";
    noBtn.textContent = "Okay okay 😅";

    // Reset dodge styling so it sits nicely after “Yes”
    noBtn.style.position = "static";
    noBtn.style.left = "";
    noBtn.style.top = "";    
    // Hide buttons
    yesBtn.style.display = "none";
    noBtn.style.display = "none";}

function dodgeNo() {
    const parent = document.querySelector(".buttons");
    const pRect = parent.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();

    parent.style.position = "relative";
    noBtn.style.position = "absolute";

    const maxX = Math.max(0, pRect.width - bRect.width);
    const maxY = Math.max(0, pRect.height - bRect.height);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    makeSparks(
        pRect.left + x + bRect.width / 2,
        pRect.top + y + bRect.height / 2,
        10,
    );
}

createHearts();

yesBtn.addEventListener("click", celebrateYes);
noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("click", dodgeNo);

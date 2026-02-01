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

function launchFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7; // Keep in upper 70% of screen
    
    const colors = ['#ff4d8d', '#ff7ab2', '#3cffb5', '#ffd93d', '#ff6b9d', '#a78bfa'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create burst of particles
    const particleCount = 25 + Math.floor(Math.random() * 15);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);
        
        sparklesEl.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

function celebrateYes() {
    toast.style.display = "block";

    const rect = yesBtn.getBoundingClientRect();
    makeSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);

    yesBtn.textContent = "YAY!!! 💖";
    noBtn.textContent = "Okay okay 😅";

    // Reset dodge styling so it sits nicely after "Yes"
    noBtn.style.position = "static";
    noBtn.style.left = "";
    noBtn.style.top = "";
    
    // Hide the entire buttons container
    const buttonsContainer = document.querySelector(".buttons");
    buttonsContainer.style.display = "none";
    
    // Launch fireworks!
    for (let i = 0; i < 5; i++) {
        setTimeout(() => launchFirework(), i * 200);
    }
    
    // Continue launching fireworks for a minute
    const fireworkInterval = setInterval(() => {
        launchFirework();
    }, 400);
    
    setTimeout(() => clearInterval(fireworkInterval), 60000);
}

function dodgeNo() {
    const parent = document.querySelector(".buttons");
    const pRect = parent.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const maxX = Math.max(0, pRect.width - bRect.width);
    const maxY = Math.max(0, pRect.height - bRect.height);

    let x, y, attempts = 0;
    const minDistance = 20; // Minimum pixels between buttons
    
    // Try to find a position that doesn't overlap with Yes button
    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
        
        // Calculate absolute position of No button
        const noLeft = pRect.left + x;
        const noRight = noLeft + bRect.width;
        const noTop = pRect.top + y;
        const noBottom = noTop + bRect.height;
        
        // Check if there's enough distance from Yes button
        const hasHorizontalGap = noRight + minDistance < yesRect.left || noLeft > yesRect.right + minDistance;
        const hasVerticalGap = noBottom + minDistance < yesRect.top || noTop > yesRect.bottom + minDistance;
        
        if (hasHorizontalGap || hasVerticalGap) {
            break;
        }
        
        attempts++;
    } while (attempts < 50);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = "none";

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

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("light-theme");
        themeToggle.innerHTML = document.documentElement.classList.contains("light-theme")
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';
    });
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = document.getElementById("header")?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
}

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
    });
    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.style.display = "none";
        });
    });
}

const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 100);
    if (backToTop) backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

// =============================
// SECTION REVEAL ON SCROLL
// =============================

const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });
sections.forEach(section => observer.observe(section));

// =============================
// PARTICLE BACKGROUND
// =============================

const canvas = document.getElementById("bgCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 150;
    const particles = [];
    const maxDistance = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim();

        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const isLight = document.documentElement.classList.contains("light-theme");
                    ctx.strokeStyle = (isLight ? "rgba(0,0,0," : "rgba(255,255,255,") + (1 - dist / maxDistance) + ")";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// =============================
// INTERACTIVE DEMO: API CALL
// =============================

const analyzeButton = document.getElementById("analyze-btn");
if (analyzeButton) {
    analyzeButton.addEventListener("click", async () => {
        const inputText = document.getElementById("demo-text")?.value;
        const resultText = document.getElementById("result-text");

        if (!inputText || !inputText.trim()) {
            resultText.innerText = "❗Veuillez entrer un texte à analyser.";
            resultText.style.color = "#ffa500"; 
            return;
        }
        // pour eviter que l'user entre des phrase courtes 
        const wordCount = inputText.trim().split(/\s+/).length;
        const charCount = inputText.trim().length;

        if (wordCount < 5 || charCount < 10) {
            resultText.innerText = "⚠️ Le texte est trop court. Veuillez entrer une phrase plus complète.";
            resultText.style.color = "#ffa500";
            return;
        }

        // affiche un message d'attente pendant l’analyse
        resultText.innerText = "⏳ Analyse en cours...";
        resultText.style.color = "#00eaff";
        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText })
            });

            if (!response.ok) throw new Error("Erreur réseau ou serveur.");
            const result = await response.json();

            if (result.prediction === "Fake") {
                resultText.innerText = `🛑 Analyse : Le texte est très probablement une FAKE NEWS (${result.confidence}% de certitude).`;
                resultText.style.color = "#ff5555";
                const speech = new SpeechSynthesisUtterance(`Alerte : Ce texte est très probablement une fake news avec ${result.confidence}% de certitude.`);
                speech.lang = "fr-FR";
                speechSynthesis.speak(speech);

                
            } else {
                resultText.innerText = `✅ Analyse : Le texte semble FIABLE (${result.confidence}% de fiabilité).`;
                resultText.style.color = "#55ff55"; 
                const speech = new SpeechSynthesisUtterance(`Bonne nouvelle : ce texte semble fiable avec ${result.confidence}% de certitude.`);
                speech.lang = "fr-FR";
                speechSynthesis.speak(speech);
            }

        } catch (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
            resultText.innerText = "❌ Erreur : impossible d’analyser ce texte pour le moment.";
            resultText.style.color = "#ff0000"; 
        }
    });
}

document.getElementById("demo-text").addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault(); // Évite un saut de ligne
        document.getElementById("analyze-btn").click();
    }
});


// =============================
// SCROLL TO TOP
// =============================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}



// Fetching My api in render
//const response = await fetch("https://ton-api.onrender.com/predict", {
  //  method: "POST",
    //headers: {
     //   "Content-Type": "application/json"
    //},
    //body: JSON.stringify({ text: inputText })
//});












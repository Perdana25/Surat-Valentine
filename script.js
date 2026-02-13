// Config - Edit these values to customize
const config = {
    // Sequence of questions
    questions: [
        {
            text: "Tanggal Jadian kita? 🗓️",
            answers: ["221224", "22/12/24"], // Date formats
            hint: "Hint: tanggal, bulan, tahun (260305) 👀"
        },
        {
            text: "Apa nama panggilan yang sayang kasih ke dana? 🐻",
            answers: ["sayang", "ndut", "aneh"], // Edit this!
            hint: "Hint: kebanyakan makan atau kelakuan yang tidak biasa? 😉"
        },
        {
            text: "Will you be my Valentine? 🌹",
            answers: ["yes", "yes i do", "of course", "yess", "ya", "mau"],
            hint: "Hint: katakan yes atau ya! ❤️"
        }
    ],
    redirectUrl: "https://perdana25.github.io/cerita-kita/", // Change this to your diary URL
    maxAttempts: 3 // Attempts per question before showing angry message
};

// DOM Elements
const passwordGate = document.getElementById('password-gate');
const questionText = document.getElementById('question-text');
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const hintMsg = document.getElementById('hint-msg');
const errorMsg = document.getElementById('error-msg');
const transitionScreen = document.getElementById('transition-screen');
const mainContent = document.getElementById('main-content');
const envelope = document.getElementById('envelope');
const redirectBtn = document.getElementById('redirect-btn');
const heartRainContainer = document.getElementById('heart-rain');

// State
let currentQuestionIndex = 0;
let attempts = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createHeartRain();
    updateQuestionUI();

    // Play sound attempt on interaction
    document.body.addEventListener('click', () => {
        // Optional: play background music
        // document.getElementById('bg-music').play().catch(e => console.log("Audio autoplay blocked"));
    }, { once: true });
});

// Event Listeners
unlockBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
    }
});

redirectBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent bubbling
    window.location.href = config.redirectUrl;
});

// Functions
function updateQuestionUI() {
    const currentQ = config.questions[currentQuestionIndex];

    // Fade Out
    questionText.style.opacity = 0;
    hintMsg.style.opacity = 0;

    setTimeout(() => {
        // Update Content
        questionText.textContent = currentQ.text;
        hintMsg.textContent = currentQ.hint;
        passwordInput.value = "";
        errorMsg.classList.add('hidden');
        attempts = 0; // Reset attempts for new question

        // Fade In
        questionText.style.opacity = 1;
        hintMsg.style.opacity = 0.7;
        passwordInput.focus();
    }, 300);
}

function checkPassword() {
    const input = passwordInput.value.trim().toLowerCase();
    const currentQ = config.questions[currentQuestionIndex];

    // Check if input matches any valid answer for current question
    const isValid = currentQ.answers.some(ans => ans.toLowerCase() === input);

    if (isValid) {
        handleCorrectAnswer();
    } else {
        handleWrongPassword();
    }
}

function handleCorrectAnswer() {
    // Success animation for input
    passwordInput.style.borderColor = "#4CAF50";
    passwordInput.style.boxShadow = "0 0 10px rgba(76, 175, 80, 0.5)";

    setTimeout(() => {
        // Reset styles
        passwordInput.style.borderColor = "rgba(212, 175, 55, 0.3)";
        passwordInput.style.boxShadow = "none";

        // Move to next question or unlock
        currentQuestionIndex++;

        if (currentQuestionIndex < config.questions.length) {
            updateQuestionUI();
        } else {
            unlockSite();
        }
    }, 500);
}

function handleWrongPassword() {
    attempts++;

    // Shake animation
    const card = document.querySelector('.glass-card');
    card.classList.remove('shake');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('shake');

    // Show error message
    errorMsg.classList.remove('hidden');

    if (attempts >= config.maxAttempts) {
        errorMsg.textContent = "Kamu beneran pacarku kan? 🤨";
        // Dramatic effect: Red glow
        document.body.style.boxShadow = "inset 0 0 50px rgba(255, 0, 0, 0.3)";
    } else {
        const messages = [
            "Salah sayang... 🥺",
            "Coba lagi ya ❤️",
            "Masa lupa sih? 😤"
        ];
        errorMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    passwordInput.value = "";
    passwordInput.focus();
}

function unlockSite() {
    // Hide gate
    passwordGate.style.opacity = '0';
    setTimeout(() => {
        passwordGate.classList.add('hidden');

        // Show transition
        transitionScreen.classList.remove('hidden');

        // After transition delay, show main content
        setTimeout(() => {
            transitionScreen.style.opacity = '0';
            setTimeout(() => {
                transitionScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
            }, 1000);
        }, 3000);

    }, 800);
}

function createHeartRain() {
    const symbols = ['❤️', '✨', '🌹'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        heartRainContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}



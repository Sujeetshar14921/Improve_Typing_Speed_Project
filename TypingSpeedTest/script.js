const text = document.querySelector(".typing-text p");
const input = document.querySelector("#text-box");
const time = document.querySelector("#timer span");
const mistakes = document.querySelector("#mistakes span");
const wpm = document.querySelector("#wpm span");
const cpm = document.querySelector("#cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false;

const paragraphs = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Do not wait for tomorrow, because tomorrow may never come. Start now.",
    "Learning never exhausts the mind, it only makes you stronger.",
    "Confidence comes not from always being right but from not fearing to be wrong."
];

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    text.innerHTML = '';
    for (const char of paragraphs[randomIndex]) {
        text.innerHTML += `<span>${char}</span>`;
    }
    text.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => input.focus()); // auto focus on typing
}

function initTyping() {
    const chars = text.querySelectorAll("span");
    let typedChar = input.value.charAt(charIndex);

    if (charIndex < chars.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar === chars[charIndex].innerText) {
            chars[charIndex].classList.add("correct");
        } else {
            chars[charIndex].classList.add("incorrect");
            mistakesCount++;
            mistakes.innerText = mistakesCount;
        }

        chars[charIndex].classList.remove("active");
        charIndex++;
        if (charIndex < chars.length) {
            chars[charIndex].classList.add("active");
        }
    }

    // Calculate WPM & CPM
    let correctChars = charIndex - mistakesCount;
    let wpmCalc = Math.round(((correctChars / 5) / (maxTime - timeLeft)) * 60);
    wpm.innerText = wpmCalc > 0 && isFinite(wpmCalc) ? wpmCalc : 0;
    cpm.innerText = correctChars;
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
    } else {
        clearInterval(timer);
        input.disabled = true; // stop typing
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakesCount = 0;
    isTyping = false;
    input.value = "";
    time.innerText = timeLeft;
    mistakes.innerText = mistakesCount;
    wpm.innerText = 0;
    cpm.innerText = 0;
    input.disabled = false;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", resetGame);

// Load the first paragraph
loadParagraph();

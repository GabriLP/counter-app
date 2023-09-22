const counterDisplay = document.getElementById("counter-display");
const increaseButton = document.getElementById("increase-button");
const decreaseButton = document.getElementById("decrease-button");
const resetButton = document.getElementById("reset-button");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const toggleCircle = document.getElementById("toggle-circle");
const switchBackground = document.getElementById("switch-background")

let count = 0;

function updateCounter() {
    counterDisplay.textContent = count;
    bounceAnimation();
}

function confirmReset() {
    const confirmReset = confirm("Are you sure you want to reset the count?");
    if (confirmReset) {
        count = 0;
        updateCounter();
    }
}

function handleKeyboardShortcuts(event) {
    switch (event.key) {
        case "+":
            count++;
            break;
        case "-":
            if (count >= 1) {
            count--;
            break;
            }
        case "r": 
        case "R":
            confirmReset();
            break;
        default:
            return;
    }
    updateCounter();
}

document.addEventListener("keydown", handleKeyboardShortcuts);

increaseButton.addEventListener("click", () => {
    count++;
    updateCounter();
});

decreaseButton.addEventListener("click", () => {
    if (count >= 1) {
        count--;
    }
    updateCounter();
});

resetButton.addEventListener("click", confirmReset);


function bounceAnimation() {
    counterDisplay.classList.add('bounce');
    setTimeout(() => {
        counterDisplay.classList.remove('bounce');
    }, 500);
}


function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark");

    // Toggle background color and text color for dark mode
    if (body.classList.contains("dark")) {
        body.style.backgroundColor = "#1a202c";
        body.style.color = "#e2e8f0";
        switchBackground.style.backgroundColor = "#5f5f5f"
    } else {
        body.style.backgroundColor = "#e2e8f0";
        body.style.color = "#1a202c";
        switchBackground.style.backgroundColor = "#ccc"
    }
}

darkModeSwitch.addEventListener("change", () => {
    toggleDarkMode();

    // Animate the toggle slider
    if (darkModeSwitch.checked) {
        toggleCircle.style.transform = "translateX(0)";
    } else {
        toggleCircle.style.transform = "translateX(100%)";
    }
});

// Check mode preference on page load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkMode();
    darkModeSwitch.checked = true;
    toggleCircle.style.transform = "translateX(0)";
} else {
    darkModeSwitch.checked = false;
    toggleCircle.style.transform = "translateX(100%)";
    switchBackground.style.backgroundColor = "#ccc"
}
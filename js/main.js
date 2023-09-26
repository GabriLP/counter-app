const counterDisplay = document.getElementById("counter-display");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const toggleCircle = document.getElementById("toggle-circle");
const switchBackground = document.getElementById("switch-background")
const buttonContainer = document.getElementById('button-wrapper');
const footer = document.getElementsByTagName('footer');

let count = 0;


function createButton(tagName, textContent, dataId, ...classList) {
    const button = document.createElement(tagName);
    button.textContent = textContent;
    button.dataset.id = dataId;
    button.classList.add(...classList);
    return button;
}

const increaseButton = createButton('button', 'Increase', 'increase-button', 
'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full')

const decreaseButton = createButton('button', 'Decrease', 'decrease-button', 
'bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full')

const resetButton = createButton('button', 'Reset', 'reset-button', 
'bg-gray-500', 'hover:bg-gray-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full')


buttonContainer.appendChild(increaseButton);
buttonContainer.appendChild(decreaseButton);
buttonContainer.appendChild(resetButton);

document.body.insertBefore(buttonContainer, footer[0]);

buttonContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    
    switch (id) {
        case 'increase-button':
            count++;
            break;

        case 'decrease-button':
                if (count >= 1) {
            count--;
        }
            break;
        case 'reset-button':
            confirmReset();
            break;
        }
        
        updateCounter();
    });
    
    
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
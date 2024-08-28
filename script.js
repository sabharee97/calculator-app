let expression = '';
let history = [];

function addToExpression(value) {
    expression += value;
    document.getElementById('display').value = expression;
}

function clearDisplay() {
    expression = '';
    document.getElementById('display').value = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    document.getElementById('display').value = expression;
}

function calculateResult() {
    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
        addToHistory(expression + ' = ' + result);
        expression = result.toString();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 5) {
        history.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.onclick = () => loadHistoryItem(item.split('=')[0].trim());
        historyList.appendChild(li);
    });
}

function loadHistoryItem(value) {
    expression = value;
    document.getElementById('display').value = expression;
}

// Function to toggle the visibility of the scientific buttons
function toggleScientific() {
    const sciButtons = document.getElementById('scientific-buttons');
    sciButtons.style.display = sciButtons.style.display === 'none' || sciButtons.style.display === '' ? 'flex' : 'none';
}

// Function to handle wrapping with scientific functions
function wrapWithFunction(func, separator = '') {
    const currentDisplay = document.getElementById('display').value;
    expression = `${func}(${currentDisplay}${separator})`;
    document.getElementById('display').value = expression;
}

// Ensure the scientific buttons are hidden initially
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scientific-buttons').style.display = 'none';
});

// Detect Enter key press and symbols
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
        addToExpression(key);
    } else if (!isNaN(key)) {  // Handle numeric input
        addToExpression(key);
    }
});

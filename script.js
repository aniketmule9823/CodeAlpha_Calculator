const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let lastInput = '';
let resultDisplayed = false;

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnText = button.textContent;

    // Clear button
    if (button.id === 'clear') {
      currentInput = '';
      display.textContent = '0';
      resultDisplayed = false;
      return;
    }

    // Equals button
    if (button.id === 'equals') {
      try {
        // Evaluate the expression safely
        const evaluated = eval(currentInput);
        display.textContent = evaluated;
        currentInput = evaluated.toString();
        resultDisplayed = true;
      } catch (e) {
        display.textContent = 'Error';
        currentInput = '';
      }
      return;
    }

    // Decimal button
    if (button.classList.contains('decimal')) {
      if (resultDisplayed) {
        currentInput = '0.';
        display.textContent = currentInput;
        resultDisplayed = false;
        return;
      }
      // Avoid multiple decimals in a number segment
      const parts = currentInput.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes('.')) {
        currentInput += '.';
        display.textContent = currentInput;
      }
      return;
    }

    // Number buttons
    if (button.classList.contains('number')) {
      if (resultDisplayed) {
        currentInput = btnText;
        resultDisplayed = false;
      } else {
        currentInput += btnText;
      }
      display.textContent = currentInput;
      return;
    }

    // Operator buttons
    if (button.classList.contains('operator')) {
      if (currentInput === '') return; // prevent starting with operator
      if (resultDisplayed) resultDisplayed = false;

      // Prevent two operators in a row
      if (isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1) + button.getAttribute('data-op');
      } else {
        currentInput += button.getAttribute('data-op');
      }
      display.textContent = currentInput;
    }
  });
});

//
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');

// event listeners to get key data types and display values
keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    operatorKeys.forEach((item) => {
      item.dataset.state = "";
    });
    key.dataset.state = "selected";

    calculator.dataset.firstOperand = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    // Performing an operation
    const firstOperand = calculator.dataset.firstOperand;
    const operator = calculator.dataset.operator;
    const secondOperand = displayValue;
    display.textContent = calculate(firstOperand, operator, secondOperand);
  }

  if (type === "clear") {
    display.textContent = "0";
    delete calculator.dataset.firstOperand;
    delete calculator.dataset.operator;
  }

  calculator.dataset.previousKeyType = type;
});
// calculator operations
function calculate(firstOperand, operator, secondOperand) {
  firstOperand = parseInt(firstOperand);
  secondOperand = parseInt(secondOperand);

  if (operator === "add") return firstOperand + secondOperand;
  if (operator === "subtract") return firstOperand - secondOperand;
  if (operator === "multiply") return firstOperand * secondOperand;
  if (operator === "divide") return firstOperand / secondOperand;
}

function clearMyValues() {
  // Press the clear key
  const clearKey = document.querySelector('[data-type="clear"]');
  clearKey.click();

  // Clear operator states
  operatorKeys.forEach((key) => {
    key.dataset.state = "";
  });
}

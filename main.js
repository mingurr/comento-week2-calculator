const calculatorScreen = document.querySelector("#calculator__screen--result");
const calculatorScreenFormula = document.querySelector(
  "#calculator__screen--operation",
);
const buttons = document.querySelectorAll("button");

const operators = ["/", "*", "-", "+", "%"];
let previousValue = "";
let currentValue = "";
let selectedOperator = "";
let isCalculated = false;

const getDisplayValue = (value) => {
  const operatorDisplay = {
    "*": "×",
    "/": "÷",
    "+": "+",
    "-": "-",
    "%": "%",
  };
  return operatorDisplay[value] || value;
};

const calculate = () => {
  const prev = Number(previousValue);
  const cur = Number(currentValue);

  if (selectedOperator === "+") {
    return prev + cur;
  }

  if (selectedOperator === "-") {
    return prev - cur;
  }

  if (selectedOperator === "*") {
    return prev * cur;
  }

  if (selectedOperator === "/") {
    return prev / cur;
  }

  if (selectedOperator === "%") {
    return prev % cur;
  }
};

const handleDelete = () => {
  if (currentValue) {
    currentValue = currentValue.slice(0, -1);
  } else if (selectedOperator) {
    selectedOperator = "";
  } else if (previousValue) {
    previousValue = previousValue.slice(0, -1);
  }

  calculatorScreen.value = calculatorScreen.value.slice(0, -1);
};

const handleClear = () => {
  previousValue = "";
  currentValue = "";
  selectedOperator = "";
  calculatorScreen.value = "";
  calculatorScreenFormula.value = "";
};

const handleNumber = (value) => {
  if (isCalculated) {
    calculatorScreen.value = "";
    calculatorScreenFormula.value = "";
    currentValue = "";
    previousValue = "";
    selectedOperator = "";
    isCalculated = false;
  }
  if (currentValue.length > 9) {
    alert("10자리 이상의 숫자는 입력할 수 없습니다.");
  } else {
    calculatorScreen.value += value;
    currentValue += value;
  }
};

const handleOperator = (value) => {
  const displayOperator = getDisplayValue(value);

  if (!previousValue && !currentValue) {
    alert("숫자를 먼저 입력해주세요.");
    return;
  }

  if (isCalculated) {
    previousValue = calculatorScreen.value;
    currentValue = "";
    selectedOperator = value;

    calculatorScreen.value = previousValue + displayOperator;

    isCalculated = false;
    return;
  }
  previousValue = currentValue;
  currentValue = "";

  calculatorScreen.value = previousValue + displayOperator;
  selectedOperator = value;
};

const handleCalculate = (value) => {
  if (!previousValue || !currentValue || !selectedOperator) {
    return;
  }
  const displayOperator = getDisplayValue(value);
  calculatorScreenFormula.value = `${previousValue}${displayOperator}${currentValue}`;

  let result = calculate();
  calculatorScreen.value = result;
  previousValue = "";
  currentValue = result;
  selectedOperator = "";
  isCalculated = true;
};

const handleButtonClick = (e) => {
  const clickedValue = e.currentTarget.value;

  if (clickedValue == "=") {
    handleCalculate(selectedOperator);
  } else if (clickedValue == "c") {
    handleClear();
  } else if (clickedValue == "delete") {
    handleDelete();
  } else if (operators.includes(clickedValue)) {
    handleOperator(clickedValue);
  } else {
    handleNumber(clickedValue);
  }
};

buttons.forEach((btn) => btn.addEventListener("click", handleButtonClick));

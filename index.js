const calculadora = require("./calc");
const promptSync = require("prompt-sync");

const prompt = promptSync();
function options() {
  console.log(`
    1 - somar
    2 - subtrair
    3 - multiplicar
    4 - dividir
    0 - sair
    `);
}

function optionSelected(option) {
  const num1 = prompt("Digite número 1: ");
  const num2 = prompt("Digite número 2: ");

  switch (option) {
    case "1":
      return calculadora.soma(num1, num2);
    case "2":
      return calculadora.subtracao(num1, num2);
    case "3":
      return calculadora.multiplicacao(num1, num2);
    case "4":
      return calculadora.divisao(num1, num2);
  }
}

let option;
while (option !== "0") {
  options();
  option = prompt("Qual a opção ");

  if (option === "0") {
    console.log("bye bye...");
    return;
  }

  const resultado = optionSelected(option);
  console.log(`O resultado é ${resultado}`);
}

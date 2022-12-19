const calculadoraElemento = document.getElementById('calculadora') as HTMLInputElement;
const resultadoElemento = document.getElementById('resultado') as HTMLElement;

function evaluate(expression: string) {
    try {
        if(!expression.match(/[0-9/*-+.]/g)) throw new Error('Invalid expression');
        return new Function(`return ${expression}`)();
    } catch (e) {
        return null;
    }
}

// round to 3 decimal places
function round(value: number, decimals: number = 1000) {
    return Math.round(value * decimals) / decimals;
}

// isNumber type guard
function isNumber(value: any): value is number {
    return typeof value === 'number'
        && !isNaN(value)
        && isFinite(value);
}

function calcular() {
    // save the calculadoraElemento value in localStorage
    localStorage.setItem('calculadora', calculadoraElemento.value);

    // split lines from calculadoraElemento in array
    const lines = calculadoraElemento.value.split(/\r?\n/);
    const linesResult = lines.map((line) => {
        return evaluate(line);
    });
    
    // put linesResult in resultadoElemento
    resultadoElemento.innerHTML = `<div>${linesResult.map(l => isNumber(l) ? round(l) : '---').join('<br>')}`;

    // sum all numbers in linesResult
    const sum = round(linesResult.filter(isNumber).reduce((acc, curr) => {
        return acc + curr;
    }));

    // add sum to resultadoElemento
    resultadoElemento.innerHTML += `<div id="total">${sum}</div>`;

    // save sum to clipboard on click on total
    document.getElementById('total')?.addEventListener('click', () => {
        navigator.clipboard.writeText(sum.toString());
    });
}
calculadoraElemento.addEventListener('input', calcular);

// load localStorage value in calculadoraElemento
calculadoraElemento.value = localStorage.getItem('calculadora') || '';

// if calculadoraElemento is not empty, calculate
if(calculadoraElemento.value) calcular();

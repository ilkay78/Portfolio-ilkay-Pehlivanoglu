
const userInput = document.getElementById("userInput");
let expression = "";

function press(num) {
    expression += num;
    userInput.value = expression;
}

function equal() {
try {
        let result = calculate(expression);
        userInput.value = result;
        expression = String(result);

    } catch (e) {
        alert("Ungültige Eingabe!");
        expression = "";
        userInput.value = "";
    }
}

function erase() {
    expression = "";
    userInput.value = "";
}

function calculate(expr) {
    let numbers = [];
    let operators = [];
    let current = "";
for (let c of expr) {
    console.log(c);
    //in javascript ist Strings auch wie array iterable, wichtig!
        if ("+-*/".includes(c)) {
            numbers.push(parseFloat(current));
             console.log(numbers);
            operators.push(c);
            console.log(operators);
            current = "";
        } else {
            //erst hier current wird sein werte haben danach oben im array mit push method eingeben
            current += c;
        }
    }
    numbers.push(parseFloat(current));
 for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {

            if (operators[i] === "/" && numbers[i + 1] === 0) {
                throw "Division durch Null!";
            }
// ich habe hier ternary operator benutzt
            let newValue = operators[i] === "*" ?
                numbers[i] * numbers[i + 1] :
                numbers[i] / numbers[i + 1];

            numbers.splice(i, 2, newValue);
            operators.splice(i, 1);
            i--;
        }
    }
 let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") result += numbers[i + 1];
        if (operators[i] === "-") result -= numbers[i + 1];
    }

    return result;
}

        
      
        
        
  
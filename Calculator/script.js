let input = document.getElementById('inputBox'); 
let buttons = document.querySelectorAll('button');
let string = "";

function isValidExpression(expr) {
    // Allow only digits, +, -, *, /, ., and spaces
    if (!/^[0-9+\-*/. ()]+$/.test(expr)) return false;

    // Disallow consecutive operators except for negative numbers
    if (/[\+\-\*\/]{2,}/.test(expr.replace(/--/g, ""))) return false;

    // Disallow expression starting or ending with an operator (except minus at the start)
    if (/^[\+\*\/]/.test(expr) || /[\+\-\*\/]$/.test(expr)) return false;

    return true;
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnValue = e.target.innerHTML;

        if (btnValue == '=') {
            try {
                if (string.trim() === "") {
                    input.value = "";
                    return;
                }
                if (!isValidExpression(string)) {
                    throw new Error("Invalid Expression");
                }
                let result = eval(string);
                if (isFinite(result)) {
                    string = result.toString();
                    input.value = string;
                } else {
                    throw new Error("Invalid Expression");
                }
            } catch (err) {
                input.value = "Error";
                string = "";
            }
        } 
        else if (btnValue == 'AC') {
            string = "";
            input.value = string;
        } 
        else if (btnValue == 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } 
        else {
            string += btnValue;
            input.value = string;
        }
    });
});
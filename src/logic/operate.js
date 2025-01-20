import Big from "big.js";

export default function operate(numeroUno, numeroDos, operador) {
    try {
        // Convertir a Big y manejar valores nulos
        const uno = Big(numeroUno || "0");
        const dos = Big(numeroDos || "0");

        switch (operador) {
            case "+":
                return uno.plus(dos).toString();
            case "-":
                return uno.minus(dos).toString();
            case "x":
                return uno.times(dos).toString();
            case "/":
                if (dos.eq(0)) {
                    return "Error";
                }
                return uno.div(dos).toString();
            default:
                return "Error";
        }
    } catch (error) {
        console.error("Error en operación:", error);
        return "Error";
    }
}
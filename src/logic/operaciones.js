import operate from "./operate"
import isNumber from "./isNumber"

const MAX_DIGITS = 12

export default function operaciones(estado, nombreDeBoton) {
    // Si no hay estado, inicializarlo
    if (!estado) {
        estado = {
            total: null,
            siguiente: null,
            operador: null,
        };
    }

    // Limpiar calculadora
    if (nombreDeBoton === "AC") {
        return {
            total: null,
            siguiente: null,
            operador: null,
        };
    }

    // Manejo de números
    if (isNumber(nombreDeBoton)) {
        // Si hay un operador, estamos ingresando el segundo número
        if (estado.operador) {
            if (estado.siguiente) {
                return {
                    ...estado,
                    siguiente: estado.siguiente === "0" ? nombreDeBoton : estado.siguiente + nombreDeBoton
                };
            }
            return {
                ...estado,
                siguiente: nombreDeBoton
            };
        }

        // Si no hay operador, estamos ingresando el primer número
        if (estado.siguiente) {
            return {
                ...estado,
                siguiente: estado.siguiente === "0" ? nombreDeBoton : estado.siguiente + nombreDeBoton,
                total: null
            };
        }

        return {
            ...estado,
            siguiente: nombreDeBoton,
            total: null
        };
    }

    // Manejo del punto decimal
    if (nombreDeBoton === ".") {
        if (estado.siguiente) {
            if (estado.siguiente.includes(".")) return estado;
            return {
                ...estado,
                siguiente: estado.siguiente + "."
            };
        }
        return {
            ...estado,
            siguiente: "0."
        };
    }

    // Manejo del porcentaje
    if (nombreDeBoton === "%") {
        if (estado.siguiente) {
            const value = parseFloat(estado.siguiente) / 100;
            return {
                ...estado,
                siguiente: String(value)
            };
        }
        if (estado.total) {
            const value = parseFloat(estado.total) / 100;
            return {
                ...estado,
                total: String(value)
            };
        }
        return estado;
    }

    // Manejo del cambio de signo
    if (nombreDeBoton === "+/-") {
        if (estado.siguiente) {
            return {
                ...estado,
                siguiente: String(-parseFloat(estado.siguiente))
            };
        }
        if (estado.total) {
            return {
                ...estado,
                total: String(-parseFloat(estado.total))
            };
        }
        return estado;
    }

    // Manejo del igual
    if (nombreDeBoton === "=") {
        if (estado.siguiente && estado.operador) {
            const result = operate(estado.total || "0", estado.siguiente, estado.operador);
            return {
                total: result,
                siguiente: null,
                operador: null
            };
        }
        return estado;
    }

    // Manejo de operadores
    if (["+", "-", "x", "/"].includes(nombreDeBoton)) {
        // Si tenemos una operación pendiente y un nuevo número, calcular
        if (estado.operador && estado.siguiente) {
            const result = operate(estado.total || "0", estado.siguiente, estado.operador);
            return {
                total: result,
                siguiente: null,
                operador: nombreDeBoton
            };
        }

        // Si solo tenemos un número, guardarlo como total y establecer el operador
        return {
            total: estado.siguiente || estado.total || "0",
            siguiente: null,
            operador: nombreDeBoton
        };
    }

    return estado;
}
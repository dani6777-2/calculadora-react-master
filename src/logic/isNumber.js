/**
 * Verifica si un valor es un número válido para la calculadora
 * @param {string} item - El valor a verificar
 * @returns {boolean} - true si es un número válido
 */
export default function isNumber(item) {
    return /^\d+$/.test(item);
}

/**
 * Verifica si un número es válido para operaciones
 * @param {string} numero - El número a validar
 * @returns {boolean} - true si es válido para operaciones
 */
export function isValidNumber(numero) {
    if (!numero) return false;
    return !isNaN(parseFloat(numero)) && isFinite(numero);
}

/**
 * Formatea un número para mostrar en la calculadora
 * @param {string|number} numero - El número a formatear
 * @returns {string} - El número formateado
 */
export function formatNumber(numero) {
    if (!isValidNumber(numero)) return "0";
    return String(numero);
}

export function capFirstL(val: string) {
    return val.charAt(0).toUpperCase() + String(val).slice(1);
}
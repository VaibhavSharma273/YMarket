export function phoneValidator(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (!phone) return "Phone number can't be empty"
    if (!(re.test(phone))) return "Not a valid phone number format"
    return ''
}
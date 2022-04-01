export function priceValidator(price) {
    const re = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;;
    if (!price) return "Price can't be empty"
    if (!(re.test(price))) return "Not a valid price format"
    if (price.length > 151) return "Price is too high"
    return ''
}
export function nameValidator(name, nameType = 'Name') {
    if (!name) return `${nameType} can't be empty`;
    return '';
}

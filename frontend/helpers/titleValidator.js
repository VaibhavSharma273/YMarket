export function titleValidator(title) {
    if (!title) return "Title can't be empty"
    if (title.length > 151) return "Title is too long"
    return ''
}
    
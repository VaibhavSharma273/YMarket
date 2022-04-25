export function emailValidator(email) {
    const re = /\S+@yale.edu/;
    if (!email) return "Email can't be empty";
    if (!re.test(email)) return 'Not a valid email address';
    return '';
}

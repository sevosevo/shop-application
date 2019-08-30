export function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

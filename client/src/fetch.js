function updateOptions(options) {
    const update = { ...options };
    if (localStorage.token) {
      update.headers = {
        ...update.headers,
        'user-key': `Bearer ${localStorage.token}`,
      };
    }
    return update;
}
  
export default function fetchWithBearer(url, options) {
    return fetch(url, updateOptions(options));
}
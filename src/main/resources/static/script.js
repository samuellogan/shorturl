function createShortUrl() {
    const originalUrlInput = document.getElementById('originalUrl');
    const originalUrl = originalUrlInput.value;
    
    fetch('/api/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `originalUrl=${encodeURIComponent(originalUrl)}`
    })
    .then(response => response.json())
    .then(data => {
        // Update the input box with the shortened URL
        originalUrlInput.value = `${window.location.origin}/${data.shortUrlCode}`;
        
        // Highlight the content
        originalUrlInput.focus();
        originalUrlInput.select();
        
        // Copy the content to the clipboard
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        fetchAllUrls(); // Refresh the list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function fetchAllUrls() {
    fetch('/api/urls')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('urlList');
        list.innerHTML = ''; // Clear existing entries
        data.forEach(url => {
            // Create a container div for each entry
            const entryDiv = document.createElement('div');
            entryDiv.className = 'url-entry';

            // Add the link icon
            const icon = document.createElement('img');
            icon.className = 'link-icon';
            icon.src = 'assets/link.svg';
            icon.alt = 'Link Icon';

            // Add the short URL
            const shortUrlDiv = document.createElement('div');
            shortUrlDiv.className = 'short-url';
            shortUrlDiv.textContent = url.shortUrlCode;

            // Add the original URL
            const originalUrlDiv = document.createElement('div');
            originalUrlDiv.className = 'original-url';
            originalUrlDiv.textContent = url.originalUrl;

            // Add view count
            const viewCountDiv = document.createElement('div');
            viewCountDiv.className = 'view-count';
            viewCountDiv.textContent = `${url.visitCount} views`;

            // Add date created
            const dateCreatedDiv = document.createElement('div');
            dateCreatedDiv.className = 'date-created';
            dateCreatedDiv.textContent = "a";//formatDate(url.dateCreated); // You need to implement formatDate

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteUrl(url.shortUrlCode); // You need to implement deleteUrl
            };

            // Append everything to the entry div
            entryDiv.appendChild(icon);
            entryDiv.appendChild(shortUrlDiv);
            entryDiv.appendChild(originalUrlDiv);
            entryDiv.appendChild(viewCountDiv);
            entryDiv.appendChild(dateCreatedDiv);
            entryDiv.appendChild(deleteButton);

            // Append the entry div to the list
            list.appendChild(entryDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteUrl(shortUrlCode) {
    // Make sure to replace `/api/urls/` with the actual path to your delete endpoint if it's different
    fetch(`/api/urls/${shortUrlCode}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // If the delete was successful, remove the URL from the list or refresh the list
            console.log(`URL with code ${shortUrlCode} deleted.`);
            fetchAllUrls(); // Refresh the list of URLs
        } else {
            // Handle any errors if the server response was not ok
            console.error('Delete request was unsuccessful.');
        }
    })
    .catch(error => {
        // Handle any errors that occurred during fetch
        console.error('Error:', error);
    });
}


// Load all URLs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchAllUrls();
});

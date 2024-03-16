async function createShortUrl(originalUrl) {
    try {
        const response = await fetch('/api/urls/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `originalUrl=${encodeURIComponent(originalUrl)}`
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Construct the shortened URL
        const shortenedUrl = `${window.location.origin}/${data.shortUrlCode}`;

        // Return the shortened URL
        return shortenedUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error to be handled by the caller
    }
}


function updateDateCreatedElements() {
    // Get all the elements with the 'date-created' class
    const dateElements = document.querySelectorAll('.date-created');

    dateElements.forEach(element => {
        // Retrieve the date from the data attribute
        const date = new Date(element.getAttribute('data-date'));
        // Update the textContent with the new time-since string
        element.textContent = timeSince(date);
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
    
            // Create the links container
            const linksDiv = document.createElement('div');
            linksDiv.className = 'links';
    
            // Add the clickable short URL
            const shortUrlA = document.createElement('a');
            shortUrlA.className = 'shortened-url';
            shortUrlA.href = `${window.location.origin}/${url.shortUrlCode}`; // Assuming you want to prepend your domain
            shortUrlA.textContent = shortUrlA.href; // Display the full shortened URL
            shortUrlA.target = '_blank'; // Opens the link in a new tab/window
    
            // Add the clickable original URL
            const originalUrlA = document.createElement('a');
            originalUrlA.className = 'original-url';
            originalUrlA.href = url.originalUrl;
            originalUrlA.textContent = url.originalUrl;
            originalUrlA.target = '_blank'; // Opens the link in a new tab/window
    
            // Append short and original URL anchor tags to links container
            linksDiv.appendChild(shortUrlA);
            linksDiv.appendChild(originalUrlA);
    
            // Create the stats container
            const statsDiv = document.createElement('div');
            statsDiv.className = 'stats';
    
            // Add view count
            const viewCountDiv = document.createElement('div');
            viewCountDiv.className = 'view-count';
            viewCountDiv.textContent = `${url.visitCount} views`;
    
            // Add date created
            const dateCreatedDiv = document.createElement('div');
            dateCreatedDiv.className = 'date-created';
            dateCreatedDiv.textContent = timeSince(url.dateCreated);
    
            // Append view count and date created divs to stats container
            statsDiv.appendChild(viewCountDiv);
            statsDiv.appendChild(dateCreatedDiv);
    
            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.onclick = function() {
                deleteUrl(url.shortUrlCode); // You need to implement deleteUrl
            };
    
            // Append everything to the entry div
            entryDiv.appendChild(icon);
            entryDiv.appendChild(linksDiv);
            entryDiv.appendChild(statsDiv);
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
    // Update the date-created elements every minute
    setInterval(updateDateCreatedElements, 60000); // 60000ms is one minute
});


function timeSince(date) {
    console.log('Original date:', date);

    // Ensure the date is a Date object
    if (!(date instanceof Date)) {
        console.log('Converting to Date object from:', date);
        date = new Date(date);
    }

    // Check if the date is invalid
    if (isNaN(date)) {
        console.error('The provided date is invalid:', date);
        return "Invalid date";
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (isNaN(seconds)) {
        console.error("The computed 'seconds' is NaN. There might be an issue with the date input:", date);
        return "Date error";
    }

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 604800;
    if (interval > 1) {
        return Math.floor(interval) + " weeks ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }

    // Could return seconds but this seemed a bit distracting
    return "< 1 minute ago";
}


let inputElement = document.querySelector("#fullUrl");
let shortUrlElement = document.querySelector("#shortUrl");

// Assuming `inputElement` and `shortUrlElement` are correctly selected
inputElement.addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        let fullUrl = inputElement.value;

        inputElement.blur();

        // Use `await` to wait for the promise to resolve
        try {
            let shortUrl = await createShortUrl(fullUrl);
            shortUrlElement.textContent = shortUrl; // Display the actual shortened URL

            // Highlight the text content of the shortUrlElement
            window.getSelection().selectAllChildren(shortUrlElement);

            // Copy the highlighted text to the clipboard
            try {
                await navigator.clipboard.writeText(shortUrlElement.textContent);
                console.log('Short URL copied to clipboard');
            } catch (err) {
                console.error('Failed to copy short URL:', err);
            }
        } catch (error) {
            console.error('Failed to create short URL:', error);
            // Handle any errors, such as by displaying a message to the user
        }

        inputElement.classList.add('moved'); // Assuming you have CSS to move the inputElement
    }
});

inputElement.addEventListener("focus", function() {
    // This will remove the 'moved' class when the inputElement is focused again
    inputElement.classList.remove('moved');
});


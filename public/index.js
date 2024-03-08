document.addEventListener('DOMContentLoaded', () => {
    // Select form elements
    const metaForm = document.querySelector('.meta-form');
    const imageForm = document.querySelector('.image-form');

    // Select output elements
    const description = document.querySelector('.description p');
    const tags = document.querySelector('.tags p');
    const thumbnail = document.querySelector('.thumbnail img');

    // description and tags
    metaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const res = await fetch('/openai/meta', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: metaForm.title.value }),
            method: 'POST'
        });
        const data = await res.json();

        console.log('Response from /openai/meta:', res);
        console.log('Parsed data from /openai/meta:', data);

        description.textContent = data.description;
        tags.textContent = data.tags;
    });

// image/thumbnail

imageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const res = await fetch('/openai/image', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imageForm.prompt.value }),
        method: 'POST'
    });
    const data = await res.json();

    console.log('Response from /openai/image:', res);
console.log('Parsed data from /openai/image:', data);

// Check if the URL exists in the data object
if (data.url && data.url.length > 0) {
    // Log the URL to verify its value
    const thumbnailUrl = data.url[0].url;
    console.log('Thumbnail URL:', thumbnailUrl);

    // Set the src attribute of the thumbnail image
    thumbnail.setAttribute('src', thumbnailUrl);
} else {
    console.error('No URL found in response data:', data);
}

});
});
import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
//Add form event listener
searchForm.addEventListener('submit', e => {
    //Get the searched term
    const searchTerm = searchInput.value;
    //Sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //Limit
    const searchLimit = document.getElementById('limit').value;
    //Check if input is set
    if(searchTerm === '') {
        //Show message function
        showMessage('Please add a search term', 'alert-danger');
    }
    
    //Clear input
    searchInput.value = '';

    //Search reddit
    reddit.search(searchTerm, searchLimit, sortBy).then
    (results => {
        let output = '<div class="card-columns">';
        //Loop through posts
        results.forEach(post => {
            //Get images
            const image = post.preview ? post.preview.images[0].source.url : 'https://www.affiliatemarketertraining.com/wp-content/uploads/2015/01/Reddit.jpg';
            output += `
                <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
                </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });
    
    //console.log();
    e.preventDefault();
});

//Show Message
function showMessage(message, className) {
    //Adding DOM elements
    const div = document.createElement('div');
    //Add classes to div
    div.className = `alert ${className}`;
    //Add the text
    div.appendChild(document.createTextNode(message));
    //Get the parent
    const searchContainer = document.getElementById('search-container');
    //Get the search
    const search = document.getElementById('search');
    //Insert message. Insert div before search div
    searchContainer.insertBefore(div, search);
    //Timeout
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//Truncate text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}
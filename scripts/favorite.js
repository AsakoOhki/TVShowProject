const API_URL = 'https://api.themoviedb.org/3/';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500/';

$(document).ready(function() {
    //Call Favorite list functions
    loadFavoriteList();

    // Add click to remove item from list
    $('.bt-favorite').click(function(e) {
        e.preventDefault();
        $(this).parent().parent().hide();
    });
});

function loadFavoriteList() {
    let listDiv = $('#favoriteList');

    //Load the local storage values
    for (let i = 0; i < localStorage.length; i++) {
        let itemKey = localStorage.key(i);

        if (itemKey.substr(0, 7) === 'tvshow-') {
            //Retrieve tvshow info from local storage
            let data = localStorage.getItem(localStorage.key(i));
            data = JSON.parse(data);

            //Create a new card
            //Necessary fields in the data object: [id, title, score, image, overview]
            let html = createTVShowCard(data);

            //Insert the card to the list
            $(listDiv).append(html)
        }
    }

    if ($(listDiv).html() == "") {
        $(listDiv).append('<div class="col-12 mt-5 text-center"><p>No favorite TV Shows found.</p></div>');
    }

}
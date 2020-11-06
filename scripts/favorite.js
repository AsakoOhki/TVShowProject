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
            let data = localStorage.getItem(localStorage.key(i));
            data = JSON.parse(data);

            let html = `
                <div class="col-12 col-sm-4 col-md-3">
                    <a href="individual.html?id=${data.id}" >
                        <div class="card show-card mb-4" id="show-${data.id}" >
                            <img src="${data.image}" class="card-img-top" alt="${data.title}">
                            <a href='' class='bt-favorite favorited' title='Add to Favorite' data-id='${data.id}' ><i class='fas fa-heart'></i></a>
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                            </div>
                        </div>
                    </a>
                </div>`;
            $(listDiv).append(html)
        }
    }

    if ($(listDiv).html() == "") {
        $(listDiv).append('<div class="col-12 mt-5 text-center"><p>No favorite TV Shows found.</p></div>');
    }

}
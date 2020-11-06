const IMG_PATH = 'https://image.tmdb.org/t/p/w500/';

let PAGE = 1;
let FILTER_YEAR = "";
let SORT_BY = "";

$(document).ready(function() {
    loadPopular();

    $('#formSearch').submit(function(e) {
        e.preventDefault();
        PAGE = 1;
        FILTER_YEAR = $('#FilterYear').val();
        SORT_BY = $('#SortBy').val();
        loadPopular();
    });
});

function loadPopular() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + config.API_KEY;

    if (FILTER_YEAR != "") {
        url += '&first_air_date_year=' + FILTER_YEAR;
    }
    if (SORT_BY != "") {
        url += '&sort_by=' + SORT_BY;
    }
    if (PAGE != "") {
        url += '&page=' + PAGE;
    }
    //console.log(url);

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: startLoading,
        complete: stopLoading,
        success: function(res) {
            displayPopular(sanitizePopular(res));
        },
        error: function(request) {
            displayError(request.error);
        }
    }).then(() => {
        checkFavoriteTVShows();
    })
}

function displayPopular(items) {
    $('#TVShowList').empty();

    (items).forEach((data) => {
        let html = `
            <div class="col-12 col-sm-4 col-md-3">
                <a href="individual.html?id=${data.id}" >
                    <div href="individual.html?id=${data.id}" class="card show-card mb-4" id="show-${data.id}" >
                        <img src="${data.image}" class="card-img-top" alt="${data.title}">
                        <a href='' class='bt-favorite' title='Add to Favorite' data-id='${data.id}' ><i class='fas fa-heart'></i></a>
                        <div class='score'>${data.score}</div>
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <!-- <p class="card-text">${data.overview}</p> -->
                        </div>
                    </div>
                </a>
            </div>`;
        $('#TVShowList').append(html)
    })
}

function sanitizePopular(response) {
    let data = [];
    response.results.forEach((d) => {
        data.push({
            id: d.id,
            title: (typeof d.name === 'undefined') ? 'Unknown' : d.name,
            image: (typeof d.poster_path === 'undefined' || d.poster_path == null) ? 'https://via.placeholder.com/500x750' : IMG_PATH + d.poster_path,

            overview: (typeof d.overview === 'undefined') ? 'No descriptions.' : d.overview,
            score: (typeof d.vote_average === 'undefined') ? 0 : d.vote_average,
        })
    })
    return data;
}
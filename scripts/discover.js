const IMG_PATH = 'https://image.tmdb.org/t/p/w500/';

let PAGE = 1;
let NUM_PAGES = 1;
let FILTER_YEAR = "";
let SORT_BY = "";

$(document).ready(function() {
    loadDiscover();

    $('#formSearch').submit(function(e) {
        e.preventDefault();
        $('#TVShowList').empty();
        PAGE = 1;
        NUM_PAGES = 1;
        FILTER_YEAR = $('#FilterYear').val();
        SORT_BY = $('#SortBy').val();
        loadDiscover();
    });

    $('#loadMore').click(function(e) {
        e.preventDefault();
        PAGE = PAGE + 1;
        loadDiscover();
    });
});

function loadDiscover() {
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

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: startLoading,
        complete: stopLoading,
        success: function(res) {
            if (res.total_pages) {
                NUM_PAGES = res.total_pages;
            }
            displayDiscover(sanitizeDiscover(res));
        },
        error: function(request) {
            displayError(request.error);
        }
    }).then(() => {
        checkFavoriteTVShows();

        if (PAGE < NUM_PAGES) {
            $('#loadMore').show();
        } else {
            $('#loadMore').hide();
        }
    })
}

function displayDiscover(items) {
    //Insert a div to be used as anchor
    $('#TVShowList').append(`<div id="startPage${PAGE}"></div>`);

    (items).forEach((data) => {
        //Create a new card
        //Necessary fields in the data object: [id, title, score, image, overview]
        let html = createTVShowCard(data);

        //Insert the card to the list
        $('#TVShowList').append(html)
    })

    $('html, body').animate({
        scrollTop: $("#startPage" + PAGE).offset().top - 150
    }, 0);

}

function sanitizeDiscover(response) {
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
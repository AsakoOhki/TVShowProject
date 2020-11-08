$(document).ready(function() {
    //Add Header and footer
    $('footer').load("footer.html");
    $('header').load("header.html", function() {
        setActiveMenu(window.location.pathname);
    });

    //Create loading content
    addLoadContent();
});

function setActiveMenu(currentPage) {
    if (currentPage === '/') {
        currentPage = '/index.html';
    }
    $("a[href='" + currentPage + "']").addClass('active');
}

function createTVShowCard(data) {
    let scoreColor;

    if (data.score < 2.5) {
        scoreColor = "rgb(231, 76, 60)";
    } else if (data.score < 5.0) {
        scoreColor = "rgb(255, 143, 36)";
    } else if (data.score < 7.5) {
        scoreColor = "rgb(241, 196, 15)";
    } else if (data.score < 9.0) {
        scoreColor = "rgb(43, 218, 117)";
    } else {
        scoreColor = "rgb(191, 255, 144)";
    }

    let scoreStyle = `color:${scoreColor}; background:conic-gradient(${scoreColor} ${data.score*10}%, transparent 0 100%)`;

    let html = `
            <div class="col-6 col-sm-4 col-md-3">
                <a href="individual.html?id=${data.id}" >
                    <div href="individual.html?id=${data.id}" class="card show-card mb-4" id="show-${data.id}" >
                        <img src="${data.image}" class="card-img-top" alt="${data.title}">
                        <div class="overview">
                            <h5>${data.title}</h5>
                            <p class="card-text">${data.overview}</p>
                        </div>
                        <a href='' class='bt-favorite' title='Add to Favorite' data-id='${data.id}' data-title="${data.title}" data-score="${data.score}" data-image="${data.image}" data-overview="${data.overview}" >
                            <i class='fas fa-heart'></i>
                        </a>
                        <div class="score">
                            <div class="bar" style="${scoreStyle}" >
                                <div class="content" >
                                    ${data.score}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`;
    return html;
}

function checkFavoriteTVShows() {
    $(".bt-favorite").each(function() {
        // Check if it was favorited
        let lsId = 'tvshow-' + $(this).data("id");

        if (localStorage.getItem(lsId)) {
            $(this).addClass("favorited");
        } else {
            $(this).removeClass("favorited");
        }

        // Add click event
        $(this).click(function(e) {
            e.preventDefault();
            setFavorite($(this));
        });
    });
}

function setFavorite(bt) {
    //Change button class
    $(bt).toggleClass("favorited");

    //Get show info
    let id = $(bt).data("id");
    let lsId = 'tvshow-' + id;

    //Create local storage record
    if (localStorage.getItem(lsId)) {
        localStorage.removeItem(lsId);
    } else {
        let item = {
            id: id,
            title: $(bt).data("title"),
            score: $(bt).data("score"),
            image: $(bt).data("image"),
            overview: $(bt).data("overview"),
        };
        localStorage.setItem(lsId, JSON.stringify(item));
    }
}

function addLoadContent() {
    //Create loading element in the body
    const loadElement = `<div class="loading">
        <div class="spinner-border" role="status">
            <span class="sr-only text-white">Loading...</span>
        </div>
    </div>`;
    document.body.appendChild(createElementFromHTML(loadElement));
}

function startLoading() {
    $('.loading').show();
}

function stopLoading() {
    $('.loading').hide();
}

function displayError(error) {
    alert(error);
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}
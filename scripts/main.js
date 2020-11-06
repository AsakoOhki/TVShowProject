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

function checkFavoriteTVShows() {
    $(".bt-favorite").each(function() {
        // Check if it was favorited
        let lsId = 'tvshow-' + $(this).data("id");

        if (localStorage.getItem(lsId)) {
            $(this).addClass("favorited");
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
    let card = $("#show-" + id);

    //Create local storage record
    if (localStorage.getItem(lsId)) {
        localStorage.removeItem(lsId);
    } else {
        let item = {
            id: id,
            title: $(card).find('.card-title').text(),
            image: $(card).find('img').attr('src')
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
$(function() {

    let rate;
    let name;

    const getShows = async() => {
        try {
            var result = await $.ajax({
                url: `https://api.themoviedb.org/3/tv/popular?api_key=${config.API_KEY}`,
                type: 'GET',
                dataType: 'json'
            })
            rate = result.results.vote_average;
            name = result.results.name;
            return sanitizeData(result)

        } catch (error) {
            console.log(error);
            return error
        }
    }

    function displayData(items) {

        let showData = [];

        value => {
            displayData(value);
            showData = value;
        }

        items.forEach((shows) => {
            const innerDiv = $(`<a class="inner-item" href="individual.html?id=${shows.id}"></div>`);

            const img = $(`<img alt="${shows.title}" >`).attr('src', shows.image)
            innerDiv.append(img);

            const itemDiv = $('<div class="overlay"></div>').attr('id', shows.id);
            const title = $('<h2 class="text"></h2><br>').text(shows.name);
            itemDiv.append(title);

            const rank = $('<br><h3 class="score"></h3>').text(shows.rate);
            itemDiv.append(rank);

            const icon = $(`<a href='' class='bt-favorite' title='Add to Favorite' data-id='${shows.id}' data-title="${shows.name}" data-score="${shows.rate}" data-image="${shows.image}" data-overview="${shows.overview}">
            <i class="fas fa-heart"></i></a>`);
            itemDiv.append(icon);

            innerDiv.append(itemDiv);
            $('#tvimages').append(innerDiv)
        })
    }


    let showData = [];
    getShows()
        .then(value => {
            displayData(value);
            showData = value;
        })
        .then(() => {

            checkFavoriteTVShows();
        })
        .catch(error => {
            displayError();
        })



    function sanitizeData(response) {
        let shows = [];

        response.results.forEach((d) => {
            shows.push({
                id: d.id,
                rate: d.vote_average,
                name: d.name,
                overview: d.overview,
                image: 'https://image.tmdb.org/t/p/w500/' + d.poster_path,
            })
        })
        return shows;
    }

})